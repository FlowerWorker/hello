use std::env;

use reqwest::{blocking::{Client, Response}, Error};

pub fn get_token(code: String) -> Result<Response, Error> {
    let client_id = env::var("LINKEDIN_CLIENT_ID").expect("LINKEDIN_CLIENT_ID must be set");
    let client_secret = env::var("LINKEDIN_CLIENT_SECRET").expect("LINKEDIN_CLIENT_SECRET must be set");
    let root_url = env::var("BASE_URL").expect("BASE_URL must be set");

    let redirect_url = format!("{}/linkedin-callback", root_url);
    let token_url = "https://www.linkedin.com/oauth/v2/accessToken";

    let client = Client::new();
    let params = [
        ("grant_type", "authorization_code"),
        ("code", &code),
        ("redirect_uri", &redirect_url),
        ("client_id", &client_id),
        ("client_secret", &client_secret),
    ];
    
    client.post(token_url).form(&params).send()
}

pub fn get_linkedin_user_info(access_token: String) -> Result<Response, Error> {
    let client = Client::new();
    let response = client
        .get("https://api.linkedin.com/v2/userinfo")
        .bearer_auth(access_token)
        .send()?;

    if response.status().is_success() {
        Ok::<Response, Error>(response)
    } else {
        Err::<Response, Error>(response.error_for_status().err().expect("Error getting Linkedin user info"))
    }
}

pub fn share_linkedin_post(access_token: String, linkedin_user_sub: String, post_text: String) -> Result<Response, Error> {
    let client = Client::new();
    let url = "https://api.linkedin.com/v2/ugcPosts";

    let post_data = serde_json::json!({
        "author": format!("urn:li:person:{}", linkedin_user_sub),
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": post_text
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    });

    let response = client
        .post(url)
        .bearer_auth(access_token)
        .json(&post_data)
        .send()?;

    if response.status().is_success() {
        Ok(response)
    } else {
        Err(response.error_for_status().err().expect("Error posting to LinkedIn"))
    }
}


#[cfg(test)]
mod tests {
    use crate::services::linkedin_service::get_token;

    use mockito::mock;

    #[test]
    fn test_get_token() {
        let _mock = mock("POST", "/oauth/v2/accessToken")
            .with_status(200)
            .with_body(r#"{"access_token":"test_token","expires_in":3600}"#)
            .create();

        let code = "test_code".to_string();
        let root_url = &mockito::server_url();
        std::env::set_var("BASE_URL", root_url);
        std::env::set_var("LINKEDIN_CLIENT_ID", "client_id");
        std::env::set_var("LINKEDIN_CLIENT_SECRET", "client_secret");

        let result = get_token(code);
        assert!(result.is_ok());
    }
}