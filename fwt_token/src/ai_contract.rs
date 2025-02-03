use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct MatchRequest {
    client_requirements: String,
}

/// Sends client requirements to the AI service and retrieves the consultant match result.
pub async fn match_consultant(client_requirements: &str) -> Result<String, reqwest::Error> {
    let client = Client::new();
    let request = MatchRequest {
        client_requirements: client_requirements.to_string(),
    };

    const AI_SERVICE_URL: &str = "http://ai_service/match"; // Replace with the actual service URL.

    // Send the request and handle potential errors
    let response = client
        .post(AI_SERVICE_URL)
        .json(&request)
        .send()
        .await
        .map_err(|e| {
            eprintln!("Network or connection error: {}", e); // Log connection errors
            e
        })?
        .error_for_status() // Check HTTP errors
        .map_err(|e| {
            eprintln!("HTTP error: {}", e); // Log HTTP errors
            e
        })?
        .text()
        .await
        .map_err(|e| {
            eprintln!("Error reading response body: {}", e); // Log response parsing errors
            e
        })?;

    Ok(response)
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    const TEST_ENDPOINT: &str = "/match";

    #[tokio::test]
    async fn test_match_consultant_success() {
        // Start mock server
        let mock_server = MockServer::start().await;

        // Mock a successful response
        let mock_response = "Consultant Matched".to_string();
        Mock::given(method("POST"))
            .and(path(TEST_ENDPOINT))
            .respond_with(ResponseTemplate::new(200).set_body_string(mock_response.clone()))
            .mount(&mock_server)
            .await;

        // Use the mock server for testing
        let ai_service_url = format!("{}{}", mock_server.uri(), TEST_ENDPOINT);
        let client = Client::new();
        let request = MatchRequest {
            client_requirements: "Example requirements".to_string(),
        };

        let response = client
            .post(&ai_service_url)
            .json(&request)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();

        assert_eq!(response, mock_response, "Expected response did not match.");
    }

    #[tokio::test]
    async fn test_match_consultant_failure() {
        // Start mock server
        let mock_server = MockServer::start().await;

        // Mock a server error
        Mock::given(method("POST"))
            .and(path(TEST_ENDPOINT))
            .respond_with(ResponseTemplate::new(500).set_body_string("Internal Server Error"))
            .mount(&mock_server)
            .await;

        // Use the mock server for testing
        let ai_service_url = format!("{}{}", mock_server.uri(), TEST_ENDPOINT);
        let client = Client::new();
        let request = MatchRequest {
            client_requirements: "Example requirements".to_string(),
        };

        let response = client
            .post(&ai_service_url)
            .json(&request)
            .send()
            .await;

        assert!(
            response.is_err(),
            "Expected an error for server failure, but the request succeeded."
        );

        if let Err(e) = response {
            eprintln!("Captured error: {}", e); // Log the error for debugging
        }
    }
}