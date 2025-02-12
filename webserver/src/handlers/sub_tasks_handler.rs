use actix_web::{ get,patch,delete, post, web, HttpResponse, Responder, ResponseError};

use diesel::prelude::*;

use serde::{Deserialize, Serialize};

use crate::handlers::error::ApiError;
use crate::models::sub_tasks_assignee::SubTaskWithAssignedUsers;
use crate::models::user::UserSub;
use crate::run_async_query;
use crate::services::user_service::get_user_id_by_email;
use crate::services::sub_tasks_service;
use crate::{auth::auth_middleware, db::DbPool};
use crate::tasks::enums::{Priority, Progress};


#[derive(Serialize, Deserialize)]
pub struct CreateSubTaskRequest {
    task_id:i32,
    title:String,
    description: String,
    due_date: Option<String>,
    priority: Priority,
    progress: Progress,
    assigned_users: Option<Vec<i32>>, 

}

#[derive(Deserialize,Serialize)]
pub struct UpdateSubTaskRequest {
    pub title:Option<String>,
    pub description: Option<String>,
    pub completed: Option<bool>,
    pub progress: Option<Progress>,
    pub priority: Option<Priority>,
    pub due_date: Option<String>,
    assigned_users: Option<Vec<i32>>, 
}


pub fn sub_task_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/subtasks")
            .wrap(auth_middleware::Auth)
            .service(create_subtask)
            .service(get_sub_tasks)
            .service(get_sub_tasks_with_assignees)
            .service(update_subtask)
            .service(delete_subtask)
            
    );
}

#[post("")]
pub async fn create_subtask(
    pool: web::Data<DbPool>,
    subtask: web::Json<CreateSubTaskRequest>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {

    let create_subtask = run_async_query!(pool, |conn: &mut PgConnection| {

        let user_id = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;


        sub_tasks_service::create_subtask(
            conn,
            subtask.task_id,
            &subtask.title,
            &subtask.description,
            subtask.due_date.clone(),
            subtask.priority,
            subtask.progress,
            user_id,
            subtask.assigned_users.clone()
        )
        .map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Created().json(create_subtask))
}

#[get("")]
pub async fn get_sub_tasks(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, impl ResponseError> {
    let sub_tasks = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        // Get the user ID by their email from the logged-in user
        let users_id = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;

        // Retrieve the subtasks created by the user
        sub_tasks_service::get_sub_tasks(conn, users_id).map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(sub_tasks))
}

#[get("/{task_id}")]
pub async fn get_sub_tasks_with_assignees(
    pool: web::Data<DbPool>,
    task_id: web::Path<i32>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {
    let task_id = task_id.into_inner();
    let user_email = user_sub.0.clone();

    let sub_tasks_with_assignees = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_email, conn).map_err(DatabaseError::from)?; // Get user_id from email
        sub_tasks_service::get_sub_tasks_with_assignees(conn, task_id, user_id).map_err(DatabaseError::from)
    })?;

    Ok(HttpResponse::Ok().json(sub_tasks_with_assignees))
}

#[patch("/{task_id}/{sub_task_id}")]
pub async fn update_subtask(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32)>,
    subtask_update: web::Json<UpdateSubTaskRequest>,
    user_sub: UserSub,
) -> Result<impl Responder, impl ResponseError> {
    let (task_id, sub_task_id) = path.into_inner();
    
    let updated_subtask = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;

        // Update the subtask and assigned users
        let subtask_with_assignees = sub_tasks_service::update_subtask(
            conn,
            sub_task_id,
            task_id,
            user_id,
            subtask_update.title.as_deref(),
            subtask_update.description.as_deref(),
            subtask_update.completed,
            subtask_update.progress,
            subtask_update.priority,
            subtask_update.due_date.clone(),
            subtask_update.assigned_users.clone(),
        )
        .map_err(DatabaseError::from)?;

        Ok::<SubTaskWithAssignedUsers, DatabaseError>(subtask_with_assignees)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(updated_subtask))
}


#[delete("/{task_id}/{sub_task_id}")]
pub async fn delete_subtask(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32)>,
    user_sub: UserSub,
) -> Result<impl Responder, impl ResponseError> {
    let (task_id, sub_task_id) = path.into_inner();
    
    run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;

        // Delete the subtask
        sub_tasks_service::delete_subtask(conn, sub_task_id, task_id, &user_id)
            .map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::NoContent().finish())
}

#[cfg(test)]
mod tests {
    use crate::database::db;
    use crate::database::test_db::TestDb;
    use crate::handlers::auth_handler::{auth_routes, LoginRequest};
    use crate::services::project_service::create_project;
    use crate::services::user_service::register_user;
    use crate::services::task_service::create_task;
    use actix_web::http::StatusCode;
    use actix_web::{test, App};

    use super::*;

    #[actix_rt::test]
    async fn create_subtask_success() {
        let db = TestDb::new();
        let pool = db::establish_connection(&db.url());
        dotenv::dotenv().ok();
    
        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool.clone()))
                .configure(auth_routes)
                .configure(sub_task_routes),
        )
        .await;
    
        let user = register_user(
            &mut db.conn(),
            "test user",
            "testpassword",
            "test@email.com",
        )
        .expect("Failed to register user");
    
        let project = create_project(
            &mut db.conn(),
            "test project",
            "test project description",
            &user.id,
        )
        .expect("Failed to create project");

        // Dynamically create a task and fetch its ID
        let task_id = create_task(
            &mut db.conn(),
            "initial description",
            100,
            project.id,
            user.id,
            "initial title",
            None,
        )
        .expect("Failed to create task");
    
        let log_req = test::TestRequest::post()
            .uri("/auth/login")
            .set_json(&LoginRequest {
                email: "test@email.com".to_string(),
                password: "testpassword".to_string(),
            })
            .to_request();
    
        let log_resp = test::call_service(&app, log_req).await;
    
        assert_eq!(log_resp.status(), StatusCode::OK);
    
        let auth_header = log_resp
            .headers()
            .get("Authorization")
            .expect("No authorization header")
            .to_str()
            .expect("Failed to convert header to string");
    
        let req = test::TestRequest::post()
            .uri("/subtasks")
            .append_header(("Authorization", auth_header))
            .set_json(&CreateSubTaskRequest {
                task_id:task_id.id, 
                title: "Subtask title".to_string(),
                description: "Subtask description".to_string(),
                due_date: None,
                priority: Priority::Medium,
                progress: Progress::ToDo,
                assigned_users: Some(vec![1]),
            })
            .to_request();
    
        let resp = test::call_service(&app, req).await;
    
        assert_eq!(resp.status(), StatusCode::CREATED);
    }
    

    #[actix_rt::test]
    async fn get_sub_tasks_success() {
        let db = TestDb::new();
        let pool = db::establish_connection(&db.url());
        dotenv::dotenv().ok();

        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool.clone()))
                .configure(auth_routes)
                .configure(sub_task_routes),
        )
        .await;

        let _ = register_user(
            &mut db.conn(),
            "test user",
            "testpassword",
            "test@email.com",
        )
        .expect("Failed to register user");

        let log_req = test::TestRequest::post()
            .uri("/auth/login")
            .set_json(&LoginRequest {
                email: "test@email.com".to_string(),
                password: "testpassword".to_string(),
            })
            .to_request();

        let log_resp = test::call_service(&app, log_req).await;

        assert_eq!(log_resp.status(), StatusCode::OK);

        let auth_header = log_resp
            .headers()
            .get("Authorization")
            .expect("No authorization header")
            .to_str()
            .expect("Failed to convert header to string");

        let req = test::TestRequest::get()
            .uri("/subtasks")
            .append_header(("Authorization", auth_header))
            .to_request();

        let resp = test::call_service(&app, req).await;

        assert_eq!(resp.status(), StatusCode::OK);
    }

    #[actix_rt::test]
    async fn get_sub_tasks_with_assignees_success() {
        let db = TestDb::new();
        let pool = db::establish_connection(&db.url());
        dotenv::dotenv().ok();

        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool.clone()))
                .configure(auth_routes)
                .configure(sub_task_routes),
        )
        .await;

        let user = register_user(
            &mut db.conn(),
            "test user",
            "testpassword",
            "test@email.com",
        )
        .expect("Failed to register user");
    
        let project = create_project(
            &mut db.conn(),
            "test project",
            "test project description",
            &user.id,
        )
        .expect("Failed to create project");

        let task_id = create_task(
            &mut db.conn(),
            "initial description",
            100,
            project.id,
            user.id,
            "initial title",
            None,
        )
        .expect("Failed to create task");

        let log_req = test::TestRequest::post()
            .uri("/auth/login")
            .set_json(&LoginRequest {
                email: "test@email.com".to_string(),
                password: "testpassword".to_string(),
            })
            .to_request();

        let log_resp = test::call_service(&app, log_req).await;

        assert_eq!(log_resp.status(), StatusCode::OK);

        let auth_header = log_resp
            .headers()
            .get("Authorization")
            .expect("No authorization header")
            .to_str()
            .expect("Failed to convert header to string");

        let req = test::TestRequest::get()
            .uri(&format!("/subtasks/{}", task_id.id))
            .append_header(("Authorization", auth_header))
            .to_request();

        let resp = test::call_service(&app, req).await;

        assert_eq!(resp.status(), StatusCode::OK);
    }
    #[actix_rt::test]
async fn update_subtask_success() {
    let db = TestDb::new();
    let pool = db::establish_connection(&db.url());
    dotenv::dotenv().ok();

    let app = test::init_service(
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(auth_routes)
            .configure(sub_task_routes),
    )
    .await;

    let user = register_user(
        &mut db.conn(),
        "test user",
        "testpassword",
        "test@email.com",
    )
    .expect("Failed to register user");

    let project = create_project(
        &mut db.conn(),
        "test project",
        "test project description",
        &user.id,
    )
    .expect("Failed to create project");

    let task = create_task(
        &mut db.conn(),
        "initial description",
        100,
        project.id,
        user.id,
        "initial title",
        None,
    )
    .expect("Failed to create task");

    let subtask = sub_tasks_service::create_subtask(
        &mut db.conn(),
        task.id,
        "initial subtask",
        "initial subtask description",
        None,
        Priority::Medium,
        Progress::ToDo,
        user.id,
        Some(vec![user.id]),
    )
    .expect("Failed to create subtask");

    let log_req = test::TestRequest::post()
        .uri("/auth/login")
        .set_json(&LoginRequest {
            email: "test@email.com".to_string(),
            password: "testpassword".to_string(),
        })
        .to_request();

    let log_resp = test::call_service(&app, log_req).await;

    assert_eq!(log_resp.status(), StatusCode::OK);

    let auth_header = log_resp
        .headers()
        .get("Authorization")
        .expect("No authorization header")
        .to_str()
        .expect("Failed to convert header to string");

    let req = test::TestRequest::patch()
        .uri(&format!("/subtasks/{}/{}", task.id, subtask.id))
        .append_header(("Authorization", auth_header))
        .set_json(&UpdateSubTaskRequest {
            title: Some("Updated subtask title".to_string()),
            description: Some("Updated subtask description".to_string()),
            completed: Some(true),
            progress: Some(Progress::ToDo),
            priority: Some(Priority::High),
            due_date: None,
            assigned_users: Some(vec![user.id]),
        })
        .to_request();

    let resp = test::call_service(&app, req).await;

    assert_eq!(resp.status(), StatusCode::OK);
}
#[actix_rt::test]
async fn delete_subtask_success() {
    let db = TestDb::new();
    let pool = db::establish_connection(&db.url());
    dotenv::dotenv().ok();

    let app = test::init_service(
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(auth_routes)
            .configure(sub_task_routes),
    )
    .await;

    let user = register_user(
        &mut db.conn(),
        "test user",
        "testpassword",
        "test@email.com",
    )
    .expect("Failed to register user");

    let project = create_project(
        &mut db.conn(),
        "test project",
        "test project description",
        &user.id,
    )
    .expect("Failed to create project");

    let task = create_task(
        &mut db.conn(),
        "initial description",
        100,
        project.id,
        user.id,
        "initial title",
        None,
    )
    .expect("Failed to create task");

    let subtask = sub_tasks_service::create_subtask(
        &mut db.conn(),
        task.id,
        "initial subtask",
        "initial subtask description",
        None,
        Priority::Medium,
        Progress::ToDo,
        user.id,
        Some(vec![user.id]),
    )
    .expect("Failed to create subtask");

    let log_req = test::TestRequest::post()
        .uri("/auth/login")
        .set_json(&LoginRequest {
            email: "test@email.com".to_string(),
            password: "testpassword".to_string(),
        })
        .to_request();

    let log_resp = test::call_service(&app, log_req).await;

    assert_eq!(log_resp.status(), StatusCode::OK);

    let auth_header = log_resp
        .headers()
        .get("Authorization")
        .expect("No authorization header")
        .to_str()
        .expect("Failed to convert header to string");

    let req = test::TestRequest::delete()
        .uri(&format!("/subtasks/{}/{}", task.id, subtask.id))
        .append_header(("Authorization", auth_header))
        .to_request();

    let resp = test::call_service(&app, req).await;

    assert_eq!(resp.status(), StatusCode::NO_CONTENT);
}
}
