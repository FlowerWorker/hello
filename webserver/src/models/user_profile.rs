use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::schema::user_profiles;
use validator::Validate;
use validator_derive::Validate;
use crate::validators::validate_phone;
#[derive(Queryable, Insertable, AsChangeset, Serialize)]
#[diesel(table_name = user_profiles)]
pub struct UserProfile {
    pub user_id: i32,
    pub full_name: String,
    pub email: String,
    pub phone_number: String,
    pub department_or_team: String,
    pub job_title: String,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
#[derive(Insertable, Deserialize, Validate)]
#[diesel(table_name = user_profiles)]
pub struct UserProfileUpdate {
    #[validate(length(min = 2, max = 50, message = "Full name must be between 2 and 50 characters"))]
    pub full_name: String,
    #[validate(email(message = "Must be a valid email"))]
    #[validate(length(max = 100, message = "Email too long"))]
    pub email: String,
    #[validate(custom = "validate_phone")]
    pub phone_number: String,
    #[validate(length(min = 2, max = 100, message = "Department must be between 2 and 100 characters"))]
    pub department_or_team: String,
    #[validate(length(min = 2, max = 100, message = "Job title must be between 2 and 100 characters"))]
    pub job_title: String,
}