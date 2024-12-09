use std::env;
use crate::auth::error::AuthError;
use diesel::dsl::exists;
use diesel::prelude::*;
use diesel::result::Error;
use reqwest::{blocking::Client, blocking::Response, Error as ReqwestErr};

use crate::models::user::{NewUser, User, UserResponse};
use crate::schema::users;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct EmailRequest {
    pub to: Vec<Recipient>,
    pub sender: Sender,
    pub subject: String,
    pub textContent: String,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
pub struct Recipient {
    pub email: String,
    pub name: String,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
pub struct Sender {
    pub email: String,
    pub name: String,
}

pub fn register_user(
    conn: &mut PgConnection,
    username: &str,
    password: &str,
    email: &str,
) -> Result<User, Error> {
    let password_hash = &hash_password(password).expect("Failed to hash password");
    let new_user = NewUser {
        username,
        password_hash,
        email,
    };

    let user = diesel::insert_into(users::table)
        .values(&new_user)
        .returning(User::as_returning())
        .get_result(conn);
    log::info!("{:?}", user);
    return user;
}

pub(crate) fn get_user_by_id(user_id: i32, conn: &mut PgConnection) -> Result<User, Error> {
    users::table.find(user_id).first(conn)
}

pub(crate) fn get_user_by_email(email: &str, conn: &mut PgConnection) -> Result<User, Error> {
    users::table.filter(users::email.eq(email)).first(conn)
}

pub(crate) fn get_user_id_by_email(email: &str, conn: &mut PgConnection) -> Result<i32, Error> {
    users::table
        .filter(users::email.eq(email))
        .select(users::id)
        .first(conn)
}

pub(crate) fn verify_user_email(email: &str, conn: &mut PgConnection) -> Result<bool, Error> {
    diesel::select(exists(
        users::table.filter(users::email.eq(email))
    ))
    .get_result(conn)
}

pub(crate) fn get_users(conn: &mut PgConnection) -> Result<Vec<UserResponse>, Error> {
    let users = users::table.load::<User>(conn)?;
    let public_users = users.into_iter().map(UserResponse::from).collect();

    Ok(public_users)
}

pub fn login(conn: &mut PgConnection, email: &str, password: &str) -> Result<User, AuthError> {
    let user = get_user_by_email(email, conn);

    match user {
        Ok(user) if verify_password(&user.password_hash, password).unwrap_or(false) => Ok(user),
        _ => Err(AuthError::InvalidCredentials),
    }
}

pub fn update_user_password(conn: &mut PgConnection, email: &str, new_password: &str) -> Result<User, Error> {
    let new_password_hash = &hash_password(new_password).expect("Failed to hash password");

    diesel::update(users::table.filter(users::email.eq(email)))
         .set(users::password_hash.eq(new_password_hash))
         .returning(User::as_returning())
         .get_result(conn)
}

pub fn send_reset_email(email: &str, token: &str) -> Result<Response, ReqwestErr> {
    let smtp_api_token = env::var("SMTP_API_TOKEN").expect("SMTP_API_TOKEN must be set");
    let from_email = env::var("SMTP_FROM_EMAIL").expect("SMTP_FROM_EMAIL must be set");
    let root_url = env::var("BASE_URL").expect("BASE_URL must be set");

    let reset_url = format!("{}/reset-password?token={}", root_url, token);

    let recipient = Recipient{
        email: email.to_string(),
        name: "FlowerWork Client".to_string(),
    };
    let sender = Sender {
        email: from_email.to_string(),
        name: "FlowerWork".to_string(),
    };

    let email_body = EmailRequest {
        sender,
        to: [recipient].to_vec(),
        subject: "FlowerWork Password Reset Request".to_string(),
        textContent: format!(
            "You requested a password reset. Please click the link to reset your password:\n\n{}",
            reset_url
        ),
    };

    let client = Client::builder()
        .timeout(std::time::Duration::from_secs(10))
        .build()?;
    
    client
        .post("https://api.brevo.com/v3/smtp/email")
        .header("Content-Type", "application/json")
        .header("api-key", smtp_api_token)
        .json(&email_body)
        .send()
}

fn hash_password(plain: &str) -> Result<String, bcrypt::BcryptError> {
    bcrypt::hash(plain, bcrypt::DEFAULT_COST)
}

fn verify_password(hash: &str, plain: &str) -> Result<bool, bcrypt::BcryptError> {
    bcrypt::verify(plain, hash)
}

#[cfg(test)]
mod tests {
    use crate::database::test_db::TestDb;

    use super::*;

    #[test]
    fn test_register_user_success() {
        let db = TestDb::new();
        let mut conn = db.conn();

        let username = "testuser";
        let password = "password123";
        let email = "test@example.com";

        let result = register_user(&mut conn, username, password, email);
        println!("{:?}", result);
        assert!(
            result.is_ok(),
            "User registration failed when it should have succeeded"
        );

        let registered_user = result.unwrap();
        assert_eq!(registered_user.username, username);

        // Ensure the password is hashed
        let is_password_correct = verify_password(&registered_user.password_hash, password)
            .expect("Password verification failed");
        assert!(
            is_password_correct,
            "Password hashing or verification failed"
        );
    }

    #[test]
    fn test_register_user_duplicate_username() {
        let db = TestDb::new();
        let mut conn = db.conn();

        let username = "testuser";
        let password = "password123";
        let email = "test@example.com";
        // First registration should succeed

        let result = register_user(&mut conn, username, password, email);
        println!("{:?}", result);
        assert!(
            result.is_ok(),
            "User registration failed when it should have succeeded"
        );

        // Second registration with the same username should fail
        let second_result = register_user(&mut conn, username, password, email);
        assert!(
            second_result.is_err(),
            "Second user registration succeeded when it should have failed due to duplicate username"
        );
    }

    #[test]
    fn test_password_hashing() {
        let password = "password123";
        let hashed_password = hash_password(password).expect("Failed to hash password");

        assert_ne!(password, hashed_password);
    }

    #[test]
    fn test_verify_password() {
        let password = "password123";
        let hashed_password = hash_password(password).expect("Failed to hash password");

        let is_password_correct =
            verify_password(&hashed_password, password).expect("Password verification failed");
        assert!(is_password_correct, "Password verification failed");
    }
    
    #[test]
    fn test_update_password() {
        let db = TestDb::new();
        let mut conn = db.conn();

        let username = "testuser";
        let password = "password123";
        let email = "test@example.com";

        let _ = register_user(&mut conn, username, password, email);
        
        let newpassword= "password12";

        let result = update_user_password(&mut conn, email, newpassword);
        assert!(
            result.is_ok(),
            "User password update failed when it should have succeeded"
        );
        let updated_user = result.unwrap();
        
        let is_password_correct = verify_password(&updated_user.password_hash, newpassword)
            .expect("Updated password verification failed");
        assert!(
            is_password_correct,
            "Updated password hashing or verification failed"
        );
    }

    #[test]
    fn test_verify_email() {
        let db = TestDb::new();
        let mut conn = db.conn();

        let username = "testuser";
        let password = "password123";
        let email = "test@example.com";

        let _ = register_user(&mut conn, username, password, email);
        
        let is_email_verified = verify_user_email(email, &mut conn)
            .expect("Email verification failed");
        assert!(
            is_email_verified,
            "Email verification failed"
        );
    }
}
