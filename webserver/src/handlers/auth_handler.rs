use actix_web::{post, put, web, HttpResponse, Responder, ResponseError};
use serde::{Deserialize, Serialize};

use crate::auth::error::AuthError;
use crate::auth::jwt_auth_service::decode_jwt;
use crate::database::error::DatabaseError;
use crate::handlers::auth_handler;
use crate::handlers::error::ApiError;
use crate::models::user::UserResponse;
use crate::services::search_service::insert_single_doc;
use crate::{run_async_query, run_async_typesense_query};
use crate::{auth::jwt_auth_service::create_jwt, database::db::DbPool, services::user_service, auth::jwt_auth_service::create_reset_jwt};
use crate::search::state::SearchState;

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct RequestPasswordReset{
    pub email: String,
}

#[derive(Serialize, Deserialize)]
struct CompletePasswordReset {
    token: String,
    new_password: String,
}

#[post("/login")]
pub async fn login(
    pool: web::Data<DbPool>,
    credentials: web::Json<LoginRequest>,
) -> Result<impl Responder, impl ResponseError> {
    let user = run_async_query!(pool, |conn| {
        user_service::login(conn, &credentials.email, &credentials.password)
            .map_err(AuthError::from)
    })?;
    let bearer_token = create_jwt(&user.email);
    let public_user: UserResponse = user.into();

    Ok::<HttpResponse, ApiError>(
        HttpResponse::Ok()
            .append_header(("Authorization", format!("Bearer {}", bearer_token)))
            .json(public_user),
    )
}

#[post("/register")]
pub async fn register(
    pool: web::Data<DbPool>,
    credentials: web::Json<RegisterRequest>,
    search_state: web::Data<SearchState>,
) -> Result<impl Responder, impl ResponseError> {
    let user = run_async_query!(pool, |conn| user_service::register_user(
        conn,
        &credentials.username,
        &credentials.password,
        &credentials.email,
    )
    .map_err(DatabaseError::from))?;

    let url = format!("{}/collections/users/documents", search_state.typesense_url);
    
    let public_user: UserResponse = user.into();
    let typesense_user = serde_json::json!(public_user);


    run_async_typesense_query!(
        search_state, |state: &SearchState, url: String, body: serde_json::Value| insert_single_doc(
            &state,
            url,
            body.clone()
        ).map_err(ReqError::from), url, typesense_user
    )?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Created().json(public_user))
}

#[post("/forgot-password")]
pub async fn send_pass_reset_req(
    pool: web::Data<DbPool>,
    reset_request: web::Json<RequestPasswordReset>,
) -> Result<impl Responder, impl ResponseError> {
    let token = create_reset_jwt(&reset_request.email);
    
    let email = reset_request.email.clone();

    let email_exists = run_async_query!( pool, |conn| {
        user_service::verify_user_email(&email, conn).map_err(DatabaseError::from)
    })?;

    if !email_exists {
        return Err::<HttpResponse, ApiError>(DatabaseError::GenericError.into());
    }
    
    run_async_typesense_query!(
        &reset_request.email,
        |email: &str, token: &str| {
            user_service::send_reset_email(email, &token).map_err(ReqError::from)
        },
        &token
    )?;
    
    Ok::<HttpResponse, ApiError>(HttpResponse::Created().json("Password reset email sent"))
}

#[put("/reset-password")]
pub async fn reset_pass_complete_req(
    pool: web::Data<DbPool>,
    payload: web::Json<CompletePasswordReset>
) -> Result<impl Responder, impl ResponseError> {
    let claim =
        decode_jwt(&payload.token).map_err(|err: jsonwebtoken::errors::Error| {
            actix_web::error::ErrorUnauthorized(format!("Unauthorized: {}", err))
        })?;

    let user = run_async_query!(pool, |conn| {
        user_service::update_user_password(conn, &claim.sub, &payload.new_password).map_err(DatabaseError::from)
    })?;
    
    let public_user: UserResponse = user.into();
    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().json(public_user))
}

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").service(login).service(register).service(send_pass_reset_req).service(reset_pass_complete_req));
}

mod tests {
    use crate::{config::Config, database::db};
    use crate::database::test_db::TestDb;
    use crate::services::user_service::register_user;
    use actix_web::{test, App};
    use reqwest::blocking::Client;

    use super::*;

    #[actix_rt::test]
    async fn test_login_with_correct_credentials() {
        use actix_web::http::StatusCode;
        
        dotenv::dotenv().ok();
        let db = TestDb::new();
        let pool = db::establish_connection(&db.url());

        let typesense_url = Config::from_env().typesense_url;
        let typesense_api_key = Config::from_env().typesense_api_key;
        let client = web::block(|| {
            Client::new()
        }).await.expect("Failed to initialize typesense client.");
        let search_state = SearchState { client, typesense_url, typesense_api_key};
        
        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool.clone()))
                .app_data(web::Data::new(search_state.clone()))
                .configure(auth_routes),
        )
        .await;

        let register_request = RegisterRequest {
            username: "test".to_string(),
            email: "test@example.com".to_string(),
            password: "password".to_string(),
        };

        let req = test::TestRequest::post()
            .uri("/auth/register")
            .set_json(&register_request)
            .to_request();

        let res = test::call_service(&app, req).await;

        assert_eq!(res.status(), StatusCode::CREATED);

        let login_request = LoginRequest {
            email: "test@example.com".to_string(),
            password: "password".to_string(),
        };

        let req = test::TestRequest::post()
            .uri("/auth/login")
            .set_json(&login_request)
            .to_request();

        let res = test::call_service(&app, req).await;

        assert_eq!(res.status(), StatusCode::OK);
    }

    #[actix_rt::test]
    async fn test_login_with_incorrect_credentials() {
        use actix_web::http::StatusCode;

        dotenv::dotenv().ok();
        let db = TestDb::new();
        let pool = db::establish_connection(&db.url());

        let typesense_url = Config::from_env().typesense_url;
        let typesense_api_key = Config::from_env().typesense_api_key;
        let client = web::block(|| {
            Client::new()
        }).await.expect("Failed to initialize typesense client.");
        let search_state = SearchState { client, typesense_url, typesense_api_key};

        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(pool.clone()))
                .app_data(web::Data::new(search_state.clone()))
                .configure(auth_routes),
        )
        .await;

        let register_request = RegisterRequest {
            username: "test".to_string(),
            email: "test@example.com".to_string(),
            password: "password".to_string(),
        };

        let req = test::TestRequest::post()
            .uri("/auth/register")
            .set_json(&register_request)
            .to_request();

        let res = test::call_service(&app, req).await;

        assert_eq!(res.status(), StatusCode::CREATED);

        let login_request = LoginRequest {
            email: "test@example.com".to_string(),
            password: "wrongpassword".to_string(),
        };

        let req = test::TestRequest::post()
            .uri("/auth/login")
            .set_json(&login_request)
            .to_request();

        let res = test::call_service(&app, req).await;

        assert_eq!(res.status(), StatusCode::UNAUTHORIZED);
    }
}
