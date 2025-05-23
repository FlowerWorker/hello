use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::database::error::{DatabaseError};
use crate::auth::auth_middleware;
use crate::database::db::DbPool;
pub use crate::tasks::error::ValidationError;
use crate::handlers::error::ApiError;
use crate::models::user::UserSub;
use crate::models::user_photo_uploads::{UserPhotoUpload, NewUserPhotoUpload};
use crate::run_async_query;
use crate::services::user_photo_uploads_service;
use crate::services::user_service::get_user_id_by_email;
use aws_sdk_s3::{Client as S3Client};
use crate::models::user_photo_uploads::PresignRequest;
use std::time::Duration;
use aws_sdk_s3::presigning::PresigningConfig;
use uuid::Uuid;
use crate::s3_client::delete_avatar_from_r2;
use urlencoding::decode;
use std::collections::HashMap;
#[derive(Serialize)]
pub struct GetUserPhotoResponse {
    pub image_url: String,
    pub uploaded_at: String,
}
#[derive(Debug, Deserialize)]
pub struct UploadPhotoRequest {
    pub key: String,
}
#[get("")]
pub async fn get_user_photo(
    pool: web::Data<DbPool>,
    user_sub: UserSub,
) -> Result<impl Responder, ApiError> {
    let result = run_async_query!(pool, |conn: &mut PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn)?;
        user_photo_uploads_service::get_latest_user_photo_upload(conn, user_id)
    });
    match result {
        Ok(Some(photo)) => Ok(HttpResponse::Ok().json(GetUserPhotoResponse {
            image_url: photo.image_url,
            uploaded_at: photo.uploaded_at.to_string(),
        })),
        Ok(None) => Ok(HttpResponse::Ok().json(GetUserPhotoResponse {
            image_url: "".to_string(),
            uploaded_at: "".to_string(),
        })),
        Err(_) => Ok(HttpResponse::InternalServerError().finish()),
    }
}
#[get("/public/image")]
pub async fn serve_avatar_image(
    s3_client: web::Data<S3Client>,
    query: web::Query<HashMap<String, String>>,
) -> impl Responder {
    let key = match query.get("key") {
        Some(k) => k,
        None => return HttpResponse::BadRequest().body("Missing 'key' parameter"),
    };
    let bucket = std::env::var("AWS_S3_BUCKET_NAME").expect("AWS_S3_BUCKET_NAME not set");
    match s3_client
        .get_object()
        .bucket(bucket)
        .key(key)
        .presigned(PresigningConfig::expires_in(Duration::from_secs(600)).unwrap())
        .await
    {
        Ok(presigned) => {
            let redirect_url = presigned.uri().to_string();
            HttpResponse::TemporaryRedirect()
                .append_header(("Location", redirect_url))
                .finish()
        }
        Err(e) => {
            eprintln!("❌ Failed to generate presigned image URL: {:?}", e);
            HttpResponse::InternalServerError().body("Could not get image")
        }
    }
}
#[post("/generate-presigned-url")]
pub async fn generate_presigned_url(
    s3_client: web::Data<S3Client>,
    req: web::Json<PresignRequest>,
) -> Result<impl Responder, actix_web::Error> {
    let bucket = std::env::var("AWS_S3_BUCKET_NAME").expect("Missing bucket name");
    let allowed_types = ["image/jpeg", "image/png", "image/webp"];
    if !allowed_types.contains(&req.content_type.as_str()) {
        return Err(actix_web::error::ErrorBadRequest("Unsupported file type"));
    }

    let filename = req.filename.trim().replace("..", "").replace("/", "");
    let extension = filename
        .rsplit('.')
        .next()
        .filter(|ext| ext.len() <= 5) // Prevent .jpeg.exe trick
        .unwrap_or("jpg");
    let unique_id = Uuid::new_v4();
    let key = format!("user-uploads/avatars/{}.{}", unique_id, extension);
    let presigned_req = s3_client
        .put_object()
        .bucket(&bucket)
        .key(&key)
        .content_type(&req.content_type)
        .presigned(PresigningConfig::expires_in(Duration::from_secs(600)).unwrap()) // 10 minutes
        .await
        .map_err(|e| {
            log::error!("❌ Failed to generate presigned URL: {:?}", e);
            actix_web::error::ErrorInternalServerError("Failed to generate upload URL")
        })?;
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "url": presigned_req.uri().to_string(),
        "key": key,
    })))
}
#[post("/save")]
pub async fn save_uploaded_photo(
    pool: web::Data<DbPool>,
    s3_client: web::Data<S3Client>,
    user_sub: UserSub,
    req: web::Json<UploadPhotoRequest>,
) -> Result<impl Responder, ApiError> {
    let key = req.key.trim().to_owned();
    if !key.starts_with("user-uploads/avatars/") {
        return Ok(HttpResponse::BadRequest().body("Invalid avatar key"));
    }
    let db_result: Result<(UserPhotoUpload, Option<String>), ApiError> = run_async_query!(pool.clone(), |conn: &mut PgConnection| {
        let user_id = get_user_id_by_email(&user_sub.0, conn)?;
        let old_key = if let Some(existing) = user_photo_uploads_service::get_latest_user_photo_upload(conn, user_id)? {
            user_photo_uploads_service::delete_user_photo_upload(conn, existing.id)?;
            Some(existing.image_url)
        } else {
            None
        };
    let new_photo = user_photo_uploads_service::insert_user_photo_upload(conn, user_id, &key)?;
        Ok((new_photo, old_key))
    });
    let (saved_photo, old_key) = db_result?;
    if let Some(key) = old_key {
        if let Err(err) = delete_avatar_from_r2(&s3_client, &key).await {
            log::warn!("⚠️ Failed to delete old avatar from R2: {}", key);
        } else {
            log::info!("✅ Deleted old avatar from R2: {}", key);
        }
    }

    Ok(HttpResponse::Ok().json(saved_photo))
}
pub fn user_photo_upload_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/photo-upload")
            .wrap(auth_middleware::Auth)
            .service(generate_presigned_url)
            .service(get_user_photo)
            .service(save_uploaded_photo)
    );
}