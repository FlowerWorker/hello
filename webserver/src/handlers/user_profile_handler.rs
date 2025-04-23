use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;
use serde::Serialize;
use validator::Validate;

use crate::auth::auth_middleware;
use crate::database::db::DbPool;
use crate::database::error::DatabaseError;
use crate::handlers::error::ApiError;
use crate::models::user::UserSub;
use crate::models::user_profile::UserProfileUpdate;
use crate::run_async_query;
use crate::services::user_profile_service;
use crate::services::user_service::get_user_id_by_email;

#[derive(Serialize)]
pub struct GetUserProfileResponse {
    pub full_name: String,
    pub email: String,
    pub phone_number: String,
    pub department_or_team: String,
    pub job_title: String,
}

#[get("")]
pub async fn get_user_profile(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {

    let user_profile = run_async_query!(pool, |conn: &mut PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn)?;
        user_profile_service::get_user_profile(conn, user_id)
    });

    match user_profile {
        Ok(profile) => {
            let response = GetUserProfileResponse {
                full_name: profile.full_name,
                email: profile.email,
                phone_number: profile.phone_number,
                department_or_team: profile.department_or_team,
                job_title: profile.job_title,
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Err(DatabaseError::NotFound) => Ok(HttpResponse::Ok().json(
            GetUserProfileResponse {
                full_name: "".to_string(),
                email: "".to_string(),
                phone_number: "".to_string(),
                department_or_team: "".to_string(),
                job_title: "".to_string(),
            },
        )),
        _ => Ok(HttpResponse::InternalServerError().finish()),
    }

}

#[post("")]
pub async fn update_user_profile(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
    form: web::Json<UserProfileUpdate>,
) -> Result<impl Responder, ApiError> {
    let data = form.into_inner();

    // Validate the input data
    if let Err(e) = data.validate() {
        return Err(ApiError::ValidationError(e));
    }

    // Update the user profile
    run_async_query!(pool, |conn: &mut PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn)?;
        user_profile_service::update_user_profile(conn, user_id, &data).map_err(DatabaseError::from)
    })?;

    Ok(HttpResponse::Ok().finish())
}

pub fn user_profile_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/profile")
            .wrap(auth_middleware::Auth)
            .service(update_user_profile)
            .service(get_user_profile),
    );
}
