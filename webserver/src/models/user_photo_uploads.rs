use chrono::NaiveDateTime;
use diesel::{Insertable, Queryable};
use serde::{Deserialize, Serialize};

use crate::schema::user_photo_uploads;

#[derive(Debug, Queryable, Serialize)]
pub struct UserPhotoUpload {
    pub id: i32,
    pub user_id: i32,
    pub image_url: String,
    pub uploaded_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
#[derive(Debug, Insertable, Deserialize)]
#[table_name = "user_photo_uploads"]
pub struct NewUserPhotoUpload<'a> {
    pub user_id: i32,
    pub image_url: &'a str,
    pub uploaded_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}
#[derive(Deserialize)]
pub struct PresignRequest {
    pub filename: String,
    pub content_type: String,
}