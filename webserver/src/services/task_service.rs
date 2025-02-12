use diesel::prelude::*;
use diesel::result::Error;

use crate::database::error::DatabaseError;
use crate::models::sub_tasks::{SubTask, TaskWithSubTasks};
use crate::models::task::{ NewTask, Task};
use crate::models::task_assignee::TaskWithAssignedUsers;
use crate::schema::{tasks, users};
use crate::schema::tasks::dsl::{id,user_id as task_user_id};

use crate::tasks::enums::{Priority, Progress};
use crate::tasks::helpers::{ parse_and_validate_due_date, validate_task_ownership, validate_user_project_access};
use crate::tasks::error::ValidationError;

pub fn create_task(
    conn: &mut PgConnection,
    description: &str,
    reward: i64,
    project_id: i32,
    user_id: i32,
    title: &str,
    due_date: Option<String>,
) -> Result<Task, ValidationError> {

     // Ensure the user has user_project_access
    validate_user_project_access(conn, user_id, project_id)
    .map_err(|_| ValidationError::from(DatabaseError::PermissionDenied))?;

    // let timezone = Some("Europe/Stockholm".to_string()); <== hardcoded value for testing
    let parsed_due_date=parse_and_validate_due_date(due_date,None)?;

        let new_task = NewTask {
        description,
        reward,
        completed: false,
        project_id,
        user_id: Some(user_id),
        title,
        progress: Progress::ToDo,
        priority: Priority::Medium,
        created_at: chrono::Utc::now().naive_utc(),
        due_date: parsed_due_date,
    };

   let some = diesel::insert_into(tasks::table)
        .values(&new_task)
        .returning(Task::as_returning())
        .get_result(conn)
        .map_err(|e| ValidationError {
            message: format!("Database error: {}", e),

        });
        return  some;
}

pub(crate) fn get_tasks(
    conn: &mut PgConnection,
    user_id: &i32,
) -> Result<Vec<Task>, Error> {
    use crate::schema::tasks;

    // Fetch all tasks for the user
    let tasks: Vec<Task> = tasks::table
        .filter(tasks::user_id.eq(user_id))
        .load(conn)?;

    // Validate project access for each task
    let tasks_with_valid_access = tasks.into_iter().filter(|task| {
        // Validate that the user has access to the project's task
        validate_user_project_access(conn, *user_id, task.project_id).is_ok()
    }).collect::<Vec<Task>>();

    Ok(tasks_with_valid_access)
}

pub(crate) fn get_task_by_id(
    conn: &mut PgConnection,
    task_id: i32,
    user: &i32,
) -> Result<TaskWithSubTasks, DatabaseError> {  

    // Ensure the user has access to the project & tasks
    let task = validate_task_ownership(conn, task_id, *user)
        .map_err(|_| DatabaseError::PermissionDenied)?;  

    let _user_project = validate_user_project_access(conn, *user, task.project_id)
        .map_err(|_| DatabaseError::PermissionDenied)?;  

    let associated_subtasks = SubTask::belonging_to(&task)
        .load::<SubTask>(conn)
        .map_err(DatabaseError::DieselError)?;  

    Ok(TaskWithSubTasks {
        task,
        subtasks: associated_subtasks,
    })
}

pub fn update_task(
    conn: &mut PgConnection,
    task_id: i32,
    user_id: &i32,
    description: Option<&str>,
    reward: Option<i64>,
    completed: Option<bool>,
    title: Option<&str>,
    progress: Option<Progress>,
    priority: Option<Priority>,
    due_date: Option<String>,
    assigned_users: Option<Vec<i32>>,
    assign_access_users: Option<Vec<i32>>,
) -> Result<TaskWithAssignedUsers, ValidationError> {
    use crate::schema::{tasks, task_assignees, task_access};

    // Ensure the user has access to the project & tasks
    let task = validate_task_ownership(conn, task_id, *user_id)?;
    let _user_project = validate_user_project_access(conn, *user_id, task.project_id)?;

    let parsed_due_date = parse_and_validate_due_date(due_date,None)?;

    conn.transaction(|conn| {
        // Update the main task details
        let updated_task = diesel::update(tasks::table.filter(tasks::id.eq(task_id).and(tasks::user_id.eq(user_id))))
            .set((
                description.map(|desc| tasks::description.eq(desc)),
                reward.map(|rew| tasks::reward.eq(rew)),
                completed.map(|comp| tasks::completed.eq(comp)),
                title.map(|t| tasks::title.eq(t)),
                progress.map(|prog| tasks::progress.eq(prog)),
                priority.map(|pri| tasks::priority.eq(pri)),
                // parsed_created_at.map(|dt| tasks::created_at.eq(dt)),
                parsed_due_date.map(|dt| tasks::due_date.eq(dt)),
            ))
            .get_result::<Task>(conn)?;

        // Update assigned users if provided
        if let Some(users) = assigned_users {
            // Remove existing assignments
            diesel::delete(task_assignees::table.filter(task_assignees::task_id.eq(task_id)))
                .execute(conn)?;

            // Add new assignments
            let new_assignments: Vec<_> = users
                .into_iter()
                .map(|user_id| (task_assignees::task_id.eq(task_id), task_assignees::user_id.eq(user_id)))
                .collect();

            diesel::insert_into(task_assignees::table)
                .values(new_assignments)
                .execute(conn)?;
        }

        // Assign access to new users if provided
        if let Some(users) = assign_access_users {
            let new_accesses: Vec<_> = users
                .into_iter()
                .map(|user_id| (task_access::task_id.eq(task_id), task_access::user_id.eq(user_id)))
                .collect();

            diesel::insert_into(task_access::table)
                .values(new_accesses)
                .execute(conn)?;
        }

        // Query assigned users
        let assigned_users_query = task_assignees::table
            .inner_join(users::table)
            .filter(task_assignees::task_id.eq(task_id))
            .select(users::id)
            .load::<i32>(conn)?;

        Ok(TaskWithAssignedUsers {
            task: updated_task,
            assigned_users: assigned_users_query,
        })
    })
}


pub fn delete_task(
    conn: &mut PgConnection,
    task_id: i32,
    user_id: &i32,
) -> Result<(), DatabaseError> {

            // Ensure the user has access to the project & tasks
            let task = validate_task_ownership(conn, task_id, *user_id)?;
            let _user_project = validate_user_project_access(conn, *user_id, task.project_id)?;

    // Check if the user is the creator of the task
    let _task_creator_id: Option<i32> = crate::schema::tasks::table
        .filter(id.eq(task_id))
        .select(task_user_id)
        .first(conn)?;


    // Delete the task
    diesel::delete(crate::schema::tasks::table.filter(id.eq(task_id))).execute(conn)?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use chrono::NaiveDateTime;
    use crate::database::test_db::TestDb;
    use crate::services::project_service::create_project;
    use crate::services::user_service::register_user;

    use super::*;

    #[test]
    fn create_task_wrong_project_id() {
        let db = TestDb::new();

        let description = "test task";
        let reward = 100;
        let title : &str= "Test Title";
        let due_date = Some("25-12-3044".to_string());

        let user_id = register_user(
            &mut db.conn(),
            "test project",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let result = create_task(&mut db.conn(), description, reward, 1, user_id, title, due_date);

        assert!(
            result.is_err(),
            "Task creation succeeded when it should have failed"
        );

        println!("{:?}", result);
    }

    #[test]
    fn get_tasks_success() {
        let db = TestDb::new();

        let description = "test task";
        let reward = 100;
        let title = "Title test";
        let due_date = None;


        let user_id = register_user(
            &mut db.conn(),
            "test project",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let project_id = create_project(&mut db.conn(), "test project", "100", &user_id)
            .expect("Failed to create project")
            .id;

        let result = create_task(&mut db.conn(), description, reward, project_id,user_id,title,due_date);

        assert!(
            result.is_ok(),
            "Task creation failed when it should have succeeded"
        );

        let created_task = result.unwrap();
        assert_eq!(created_task.description, description);
        assert_eq!(created_task.reward, reward);
    }

    #[test]
    fn get_task_by_id_success() {
        let db = TestDb::new();

        let description = "test task";
        let reward = 100;
        let title = "title test";
        let due_date = None;


        let user_id = register_user(
            &mut db.conn(),
            "test project",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let project_id = create_project(&mut db.conn(), "test project", "100", &user_id)
            .expect("Failed to create project");

        let result = create_task(&mut db.conn(), description, reward, project_id.id,user_id,title,due_date);

        assert!(
            result.is_ok(),
            "Task creation failed when it should have succeeded"
        );

        let created_task = result.unwrap();
        assert_eq!(created_task.description, description);
        assert_eq!(created_task.reward, reward);
    }
    
    
    #[test]
    fn test_patch_task_update_description() {

        let db = TestDb::new();


        let reward = 100;
        let title = "test title";
        let due_date =None;

        

        let user_id = register_user(
            &mut db.conn(),
            "test user",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let project_id = create_project(&mut db.conn(), "test project", "100", &user_id)
        .expect("Failed to create project")
        .id;

        let task = create_task(&mut db.conn(), "original_Description", reward, project_id, user_id,title,due_date);


        // Call patch_task to update description
        let updated_task = update_task(
            &mut db.conn(),
            task.unwrap().id,
            &user_id,
            Some("Updated Description"),
            None,
            None,
            None,
            None,
            None,
            None,
            None,
            None,

        ).expect("faild to update the task");
        
        // Verify the description was updated
        assert_eq!(updated_task.task.description, "Updated Description");
    }
    
   
    #[test]
    fn test_patch_task_update_due_date() {
        let db = TestDb::new();
         let reward = 100;
        let title = "test title";
        let due_date =None;
        
        let user_id = register_user(
            &mut db.conn(),
            "test user",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let project_id = create_project(&mut db.conn(), "test project", "100", &user_id)
        .expect("Failed to create project")
        .id;

        let task = create_task(&mut db.conn(), "original_Description", reward, project_id, user_id,title, due_date);


        // Call patch_task to update due date
        let updated_task = update_task(
            &mut db.conn(),
            task.unwrap().id,
            &user_id,
           None,
            None,
            None,
            None,
            None,
            None,
            // None,
            Some("15-03-2025".to_string()),
            None,
            None,
        ).unwrap();
        
        // Verify the due date was updated correctly
        let expected_due_date = NaiveDateTime::parse_from_str("15-03-2025 00:00:00", "%d-%m-%Y %H:%M:%S")
        .unwrap();
    assert_eq!(updated_task.task.due_date.unwrap(), expected_due_date);
}

#[test]
fn test_delete_task() {
    let db = TestDb::new();
    
    let reward = 100;
    let title = "test title";
    let due_date = None;

    let user_id = register_user(
        &mut db.conn(),
        "test user",
        "testpassword",
        "test@test.com",
    )
    .expect("Failed to register user")
    .id;

    let project_id = create_project(&mut db.conn(), "test project", "100", &user_id)
        .expect("Failed to create project")
        .id;

    // Create a task to be deleted
    let task = create_task(
        &mut db.conn(),
        "task to delete",
        reward,
        project_id,
        user_id,
        title,
        due_date,
    )
    .expect("Failed to create task");

    // Verify the task exists before deletion
    let fetched_task = crate::schema::tasks::table
        .find(task.id)
        .first::<Task>(&mut db.conn());
    assert!(
        fetched_task.is_ok(),
        "Task should exist before deletion"
    );

    // Delete the task
    let delete_result = delete_task(&mut db.conn(), task.id, &user_id);
    assert!(
        delete_result.is_ok(),
        "Task deletion failed when it should have succeeded"
    );

    // Verify the task no longer exists
    let fetched_task_after_delete = crate::schema::tasks::table
        .find(task.id)
        .first::<Task>(&mut db.conn());
    assert!(
        fetched_task_after_delete.is_err(),
        "Task should not exist after deletion"
    );
}

}
