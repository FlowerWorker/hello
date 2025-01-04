use chrono::{NaiveDateTime, Utc};
use diesel::prelude::*;
use diesel::result::Error;

use crate::models::task::{NewTask, Priority, Progress, SubTask, Task, TaskWithSubTasks};
use crate::schema::tasks::{self};


pub fn create_task(
    conn: &mut PgConnection,
    description: &str,
    reward: i64,
    project_id: i32,
    user_id: i32,
    title: &str,
    due_date: Option<String>
) -> Result<Task, Error> {

    let parsed_due_date = due_date.and_then(|date_str| {
        NaiveDateTime::parse_from_str(&format!("{} 00:00:00", date_str), "%d-%m-%Y %H:%M:%S").ok()
    });

    let new_task = NewTask {
        description,
        reward,
        completed: false,
        project_id,
        user_id: Some(user_id),
        title,
        progress:Progress::ToDo,
        priority: Priority::Medium,
        created_at: Utc::now().naive_utc(),
        due_date: parsed_due_date,
    };
    let some = diesel::insert_into(tasks::table)
        .values(&new_task)
        .returning(Task::as_returning())
        .get_result(conn);
    return some;
}

pub(crate) fn get_tasks(conn: &mut PgConnection, users_id: &i32) -> Result<Vec<Task>, Error> {
    crate::schema::tasks::table
        .filter(tasks::user_id.eq(users_id))
        .load(conn)
}

pub(crate) fn get_task_by_id(
    conn: &mut PgConnection,
    task_id: i32,
    user: &i32,
) -> Result<TaskWithSubTasks, Error> {
    //make sure the task is within user project
    let user_project = crate::schema::projects::table
        .filter(crate::schema::projects::user_id.eq(user))
        .first::<crate::models::project::Project>(conn)?;

    let task: Task = crate::schema::tasks::table
        .filter(crate::schema::tasks::project_id.eq(user_project.id))
        .find(task_id)
        .first::<Task>(conn)?;

        let associated_subtasks = SubTask::belonging_to(&task)
        .load::<SubTask>(conn)?;

        Ok(TaskWithSubTasks {
            task,
            subtasks: associated_subtasks,
        })
    // Ok(task)
}

#[cfg(test)]
mod tests {
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
        let due_date = Some("25-12-2024".to_string());

        // let due_date = Some(Utc::now().naive_utc() + chrono::Duration::days(7));

        let user_id = register_user(
            &mut db.conn(),
            "test project",
            "testpassword",
            "test@test.com",
        )
        .expect("Failed to register user")
        .id;

        let result = create_task(&mut db.conn(), description, reward, 1,user_id,title,due_date);

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
        let due_date = Some("25-12-2024".to_string());


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
}
