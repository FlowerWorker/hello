use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use reqwest::Error as ReqwestError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ReqError {
    #[error("Network error occurred")]
    NetworkError,
    #[error("Timeout error occurred")]
    TimeoutError,
    #[error("External Request error occurred")]
    RequestError,
}

impl ResponseError for ReqError {
    fn status_code(&self) -> StatusCode {
        match *self {
            ReqError::NetworkError => StatusCode::BAD_GATEWAY,
            ReqError::TimeoutError => StatusCode::GATEWAY_TIMEOUT,
            ReqError::RequestError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        match *self {
            ReqError::NetworkError => {
                log::error!("Network error");
                HttpResponse::BadGateway().json("Network error")
            }
            ReqError::TimeoutError => {
                log::info!("Request timed out");
                HttpResponse::GatewayTimeout().json("Request timed out")
            }
            ReqError::RequestError => {
                log::error!("External Request error occurred");
                HttpResponse::InternalServerError().json("External Request error occurred")
            }
        }
    }
}