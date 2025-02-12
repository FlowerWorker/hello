use actix_web::http::StatusCode;
use actix_web::{HttpResponse, ResponseError};
use diesel::r2d2;
use diesel::result::Error as DieselError;
use std::fmt::{Display, Formatter};
use thiserror::Error;

use crate::tasks::error::ValidationError;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Database error occurred")]
    GenericError,
    #[error("Database connection error occurred")]
    ConnectionError(#[from] r2d2::PoolError),
    #[error("Diesel error occurred")]
    DieselError(#[from] DieselError),
    #[error("Error occurred: {0}")]
    DateValidationError(#[from] ValidationError),
    #[error("Permission Denied")]
    PermissionDenied,
    #[error("Resource not found")]
    NotFound,
}

impl ResponseError for DatabaseError {
    fn status_code(&self) -> StatusCode {
        match *self {
            DatabaseError::GenericError => StatusCode::INTERNAL_SERVER_ERROR,

            DatabaseError::ConnectionError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            DatabaseError::DateValidationError(_) => StatusCode::BAD_REQUEST,
            DatabaseError::PermissionDenied=> StatusCode::UNAUTHORIZED,
            DatabaseError::NotFound => StatusCode::NOT_FOUND,
            DatabaseError::DieselError(ref err) => match &err {
                DieselError::DatabaseError(_, _) => StatusCode::CONFLICT,
                _ => StatusCode::INTERNAL_SERVER_ERROR,
            },
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status_code = self.status_code();
        let error_message = self.to_string();

        log::error!("{:?}", self);

        HttpResponse::build(status_code).body(error_message)
    }
}
