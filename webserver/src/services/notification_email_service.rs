use crate::utils::email::send_email;

pub fn send_test_email(email: &str) -> Result<(), String> {
    let to = email;
    let subject = "Test Email from FlowerWorker";
    let body = "This is a test email from FlowerWorker.";
    send_email(to, subject, body)
}