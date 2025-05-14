use actix_web::{get, post, web, HttpResponse, Responder};
use crate::database::db::DbPool;
use crate::services::notification_settings_service::{get_settings, upsert_settings};
use crate::models::user::UserSub;
use crate::handlers::error::ApiError;
use crate::run_async_query;
use crate::models::notification_settings::{NewNotificationSettings, NotificationSettingsInput};
use crate::models::notification_settings::{NotificationSettingsResponse};
use crate::services::notification_email_service::send_test_email;

#[get("")]
pub async fn fetch_notification_settings(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {
    let result = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = crate::services::user_service::get_user_id_by_email(&user_sub.0, conn)?;
        get_settings(conn, user_id)
    })?;
    let response: NotificationSettingsResponse = result.into();
    Ok(HttpResponse::Ok().json(response))

}
#[post("")]
pub async fn update_notification_settings(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
    json: web::Json<NotificationSettingsInput>,
) -> Result<impl Responder, ApiError> {
    let new_data = json.into_inner();
    let result = run_async_query!(pool, |conn: &mut diesel::PgConnection| {
        let user_id = crate::services::user_service::get_user_id_by_email(&user_sub.0, conn)?;
        let data: NewNotificationSettings = (user_id, new_data).into();
        upsert_settings(conn, data)
    })?;
    let response: NotificationSettingsResponse = result.into();
    Ok(HttpResponse::Ok().json(response))

}

#[post("/send-test-email")]
pub async fn handle_send_test_email(
    user_sub: UserSub,
) -> impl Responder {

    let result = web::block(move || send_test_email(&user_sub.0)).await;

    match result {
        Ok(Ok(())) => HttpResponse::Ok().body("Email sent successfully!"),
        Ok(Err(e)) => {
            HttpResponse::InternalServerError().body("Failed to send email")
        }
        Err(e) => {
            HttpResponse::InternalServerError().body("Internal error")
        }
    }
}
pub fn notification_settings_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/notifications")
            .wrap(crate::auth::auth_middleware::Auth)
            .service(fetch_notification_settings)
            .service(update_notification_settings)
            .service(handle_send_test_email),
    );
}
