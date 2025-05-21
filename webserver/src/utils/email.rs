use reqwest::blocking::Client;
use serde::Serialize;
use std::env;

#[derive(Serialize)]
struct EmailRequest {
    sender: Sender,
    to: Vec<Recipient>,
    subject: String,
    textContent: String,
}

#[derive(Serialize)]
struct Sender {
    email: String,
    name: String,
}

#[derive(Serialize)]
struct Recipient {
    email: String,
    name: String,
}

pub fn send_email(to_email: &str, subject: &str, body: &str) -> Result<(), String> {
    let api_token = env::var("SMTP_API_TOKEN").map_err(|e| e.to_string())?;
    let from_email = env::var("SMTP_FROM_EMAIL").map_err(|e| e.to_string())?;

    let client = Client::new();

    let payload = EmailRequest {
        sender: Sender {
            email: from_email.clone(),
            name: "FlowerWork".into(),
        },
        to: vec![Recipient {
            email: to_email.into(),
            name: "User".into(),
        }],
        subject: subject.into(),
        textContent: body.into(),
    };

    let res = client
        .post("https://api.brevo.com/v3/smtp/email")
        .header("Content-Type", "application/json")
        .header("api-key", api_token)
        .json(&payload)
        .send()
        .map_err(|e| format!("Request failed: {e}"))?;

    if !res.status().is_success() {
        return Err(format!("Email send failed with status: {}", res.status()));
    }

    Ok(())
}
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_send_email_success() {
        let result = send_email(
            "flowerworker.test@gmail.com", 
            "Test Email from Test",
            "This is a test from unit test.",
        );
        assert!(result.is_ok(), "Email sending failed: {:?}", result.err());
    }
}

