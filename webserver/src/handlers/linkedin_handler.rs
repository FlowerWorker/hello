use std::env;

use actix_web::{get, post, web, HttpResponse, Responder, ResponseError};
use serde::{Deserialize, Serialize};

use crate::{run_async_typesense_query, search::error::ReqError, services::linkedin_service::{get_linkedin_user_info, get_token, share_linkedin_post}};

#[derive(Deserialize)]
struct SharePost{
    code: String,
    text: String,
    Visibility: String,
}

#[derive(Deserialize)]
struct AccessTokenResponse {
    access_token: String,
    expires_in: u64,
}

#[derive(Serialize, Deserialize)]
struct UserInfo{
    name: String,
    sub: String,
}

#[get("/auth")]
pub async fn start_linkedin_authentication()-> Result<impl Responder, impl ResponseError> {
    let client_id = env::var("LINKEDIN_CLIENT_ID").expect("LINKEDIN_CLIENT_ID must be set");
    let root_url = env::var("BASE_URL").expect("BASE_URL must be set");

    let redirect_url = format!("{}/linkedin-callback", root_url);
    let state = "random_csrf_token";

    let auth_url = format!(
        "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={}&redirect_uri={}&scope=profile%20openid%20w_member_social&state={}",
        client_id, redirect_url, state
    );

    Ok::<HttpResponse, ReqError>(
        HttpResponse::Found()
        .append_header(("Location", auth_url))
        .finish()
    )
}

#[post("/callback")]
async fn handle_linkedin_callback(
    share_request: web::Json<SharePost>,
)-> Result<impl Responder, impl ResponseError> {
    let code = share_request.code.clone();
    let token_response = run_async_typesense_query!(
        code,
        |code: String| {
            let token = get_token(code).map_err(ReqError::from)?;
            let token_json: AccessTokenResponse = token.json().map_err(ReqError::from)?;
            Ok::<AccessTokenResponse, ReqError>(token_json)
        }
    )?;

    let access_token = token_response.access_token.clone();
    let user_info_response = run_async_typesense_query!(
        access_token,
        |token: String| {
            let response = get_linkedin_user_info(token).map_err(ReqError::from)?;
            let token_json: UserInfo = response.json().map_err(ReqError::from)?;
            Ok::<UserInfo, ReqError>(token_json)
        }
    )?;

    let post_response = run_async_typesense_query!(
        token_response.access_token,
        |access_token: &String, linkedin_user_sub: String, post_text: String| {
            let post_response = share_linkedin_post(access_token.to_string(), linkedin_user_sub, post_text).map_err(ReqError::from)?;
            let post_response: serde_json::Value = post_response.json()?;
            Ok::<serde_json::Value, ReqError>(post_response)
        },
        user_info_response.sub,
        share_request.text.clone()
    )?;

    Ok::<HttpResponse, ReqError>(HttpResponse::Ok().json(post_response))
}

pub fn linkedin_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/linkedin")
            .service(start_linkedin_authentication)
            .service(handle_linkedin_callback),
    );
}