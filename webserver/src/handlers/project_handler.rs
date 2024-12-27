use actix_web::{get, post, web, HttpResponse, Responder, ResponseError};
use serde::Deserialize;

use crate::auth::auth_middleware;
use crate::database::db::DbPool;
use crate::database::error::DatabaseError;
use crate::handlers::error::ApiError;
use crate::models::user::UserSub;
use crate::search::state::SearchState;
use crate::services::search_service::insert_single_doc;
use crate::{run_async_query, run_async_typesense_query};
use crate::services::project_service;
use crate::services::user_service::get_user_id_by_email;

use super::search_handler::search_docs;

#[derive(Debug, Deserialize)]
pub struct CreateProjectRequest {
    pub title: String,
    pub description: String,
}


#[post("")]
pub async fn create_project(
    pool: web::Data<DbPool>,
    project: web::Json<CreateProjectRequest>,
    user_sub: UserSub,
    search_state: web::Data<SearchState>,
) -> Result<impl Responder, impl ResponseError> {
    let created_project = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let id: i32 = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;
        project_service::create_project(conn, &project.title, &project.description, &id)
            .map_err(DatabaseError::from)
    })?;

    let url = format!("{}/collections/projects/documents", search_state.typesense_url);
    let typesense_project = serde_json::json!(created_project);
    
    run_async_typesense_query!(
        search_state, |state: &SearchState, url: String, body: serde_json::Value| insert_single_doc(
            &state,
            url,
            body.clone()
        ).map_err(ReqError::from), url, typesense_project
    )?;
    
    Ok::<HttpResponse, ApiError>(HttpResponse::Created().json(created_project))
}

#[get("")]
pub async fn get_projects(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, impl ResponseError> {
    let projects = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let id: i32 = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;
        project_service::get_projects(conn, &id).map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(projects))
}

#[get("/{id}")]
pub async fn get_project(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<impl Responder, impl ResponseError> {
    let user = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        project_service::get_project_by_id(conn, &id.into_inner()).map_err(DatabaseError::from)
    })?;
    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(user))
}

pub fn update_project(
    conn: &mut PgConnection,
    project_id: i32,
    title: Option<String>,
    description: Option<String>,
) -> Result<Project, Error> {
    use crate::schema::projects::dsl::*;
    diesel::update(projects.filter(id.eq(project_id)))
        .set((
            title.eq(title),
            description.eq(description),
        ))
        .get_result(conn)
}

#[derive(Debug, Deserialize)]
pub struct UpdateProjectRequest {
    pub title: Option<String>,
    pub description: Option<String>,
}


#[put("/{id}")]
pub async fn update_project(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
    update: web::Json<UpdateProjectRequest>,
    user_sub: UserSub,
) -> Result<impl Responder, impl ResponseError> {
    let updated_project = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn).map_err(DatabaseError::from)?;

        let project = project_service::get_project_by_id(conn, &id.into_inner())
            .map_err(DatabaseError::from)?;
        if project.user_id != user_id {
            return Err(DatabaseError::Forbidden);
        }

        // update projects
        project_service::update_project(
            conn,
            project.id,
            update.title.clone(),
            update.description.clone(),
        ).map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(updated_project))
}

pub fn project_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/projects")
            .wrap(auth_middleware::Auth)
            .service(create_project)
            .service(get_projects)
            .service(get_project)
            .service(update_project), 
    );
}

#[actix_rt::test]
async fn test_update_project() {
    let db = TestDb::new();
    let pool = db::establish_connection(&db.url());
    dotenv::dotenv().ok();

    let app = test::init_service(
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(project_routes),
    )
    .await;

    // create test users and projects
    let user = register_user(
        &mut db.conn(),
        "test user",
        "testpassword",
        "test@email.com",
    )
    .expect("Failed to register user");

    let project = project_service::create_project(
        &mut db.conn(),
        "Initial Title",
        "Initial Description",
        &user.id,
    )
    .expect("Failed to create project");

    // update projects
    let update_data = UpdateProjectRequest {
        title: Some("Updated Title".to_string()),
        description: Some("Updated Description".to_string()),
    };

    let req = test::TestRequest::put()
        .uri(&format!("/projects/{}", project.id))
        .set_json(&update_data)
        .to_request();

    let resp = test::call_service(&app, req).await;
    assert_eq!(resp.status(), StatusCode::OK);

    // verify the result
    let updated_project: Project = test::read_body_json(resp).await;
    assert_eq!(updated_project.title, "Updated Title");
    assert_eq!(updated_project.description, "Updated Description");
}

