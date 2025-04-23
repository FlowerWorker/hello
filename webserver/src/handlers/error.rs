use crate::auth::error::AuthError;
use crate::database::error::DatabaseError;
use crate::search::error::ReqError;
use actix_web::ResponseError;
use reqwest::Error as ReqwestError;
use thiserror::Error;
use validator::ValidationErrors;
use diesel::result::Error as DieselError;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Diesel error: {0}")]
    DieselError(#[from] DieselError),
    #[error("Database error occurred")]
    DatabaseApiError(#[from] DatabaseError),
    #[error("You are not authorized to perform this action")]
    AuthorizationError(#[from] AuthError),
    #[error("External Request error occurred")]
    ReqwestError(#[from] ReqError),
    #[error("Validation failed")]
    ValidationError(#[from] ValidationErrors),
}

impl ResponseError for ApiError {
    fn status_code(&self) -> actix_web::http::StatusCode {
        match *self {
            ApiError::DieselError(_) => actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::DatabaseApiError(ref err) => err.status_code(),
            ApiError::AuthorizationError(ref err) => err.status_code(),
            ApiError::ReqwestError(ref err) => err.status_code(),
            ApiError::ValidationError(_) => actix_web::http::StatusCode::BAD_REQUEST,
        }
    }

    fn error_response(&self) -> actix_web::HttpResponse {
        match *self {
            ApiError::DieselError(ref err) => {
                actix_web::HttpResponse::InternalServerError().body(format!("Diesel error: {}", err))
            }
            ApiError::DatabaseApiError(ref err) => err.error_response(),
            ApiError::AuthorizationError(ref err) => err.error_response(),
            ApiError::ReqwestError(ref err) => err.error_response(),
            ApiError::ValidationError(ref errs) => {
                let errors = serde_json::to_value(errs).unwrap_or_else(|_| serde_json::json!("Failed to serialize validation errors"));
                actix_web::HttpResponse::BadRequest().json(serde_json::json!({
                "error": "Validation failed",
                "details": errors
            }))
            }
        }
    }
}
impl From<DatabaseError> for AuthError {
    fn from(value: DatabaseError) -> Self {
        AuthError::InvalidCredentials
    }
}

impl From<actix_web::Error> for ApiError {
    fn from(value: actix_web::Error) -> Self {
        ApiError::AuthorizationError(AuthError::InvalidCredentials)
    }
}

impl From<actix_web::Error> for ReqError {
    fn from(err: actix_web::Error) -> Self {
        ReqError::RequestError
    }
}

impl From<ReqwestError> for ReqError {
    fn from(value: ReqwestError) -> Self {
        ReqError::RequestError
    }
}
impl ApiError {
    pub fn validation(err: ValidationErrors) -> Self {
        ApiError::ValidationError(err)
    }
}