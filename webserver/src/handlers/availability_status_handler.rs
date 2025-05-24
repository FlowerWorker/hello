use actix_web::{get, post, web, HttpResponse, Responder, ResponseError};
use serde::Serialize;
use crate::auth::auth_middleware;
use crate::database::db::DbPool;
use crate::database::error::DatabaseError;
use crate::handlers::error::ApiError;
use crate::models::availability_status::{NewAvailabilityStatus, StatusUpdate};
use crate::services::availability_status_service::{get_status, set_status};
use crate::models::user::UserSub;
use crate::run_async_query;
use crate::services::user_service::get_user_id_by_email;

#[derive(Serialize)]
pub struct AvailabilityStatusResponse {
    pub status: String,
}

#[get("")]
pub async fn fetch_status(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {

    let status = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn).expect("Failed to get user id");
        get_status(conn, user_id)

    });

    match status {
        Ok(status) => {
            let response = AvailabilityStatusResponse {
                status: status.status,
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Err(DatabaseError::NotFound) => Ok(HttpResponse::Ok().json(
            AvailabilityStatusResponse {
                status: "".parse().unwrap()
            },
        )),
        _ => Ok(HttpResponse::InternalServerError().finish()),
    }

}

#[post("")]
async fn update_status(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
    json: web::Json<StatusUpdate>,
) -> Result<impl Responder, impl ResponseError> {
    run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn).expect("Failed to get user id");
        let new_status = NewAvailabilityStatus {
            user_id,
            status: json.status.clone(),
        };
        set_status(conn, new_status).map_err(DatabaseError::from)
    })?;

    Ok::<HttpResponse, ApiError>(HttpResponse::Ok().finish())
}

pub fn availability_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/availability")
            .wrap(auth_middleware::Auth)
            .service(update_status)
            .service(fetch_status),

    );
}
