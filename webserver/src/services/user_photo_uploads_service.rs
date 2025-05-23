use diesel::prelude::*;
use crate::database::error::DatabaseError;
use crate::database::error::DatabaseError::DieselError;
use crate::models::user_photo_uploads::{UserPhotoUpload, NewUserPhotoUpload};
use crate::schema::user_photo_uploads::dsl::*;
use chrono::Utc;
pub fn insert_user_photo_upload(
    conn: &mut PgConnection,
    uid: i32,
    url: &str,
) -> Result<UserPhotoUpload, DatabaseError> {
    let new_upload = NewUserPhotoUpload {
        user_id: uid,
        image_url: url,
        uploaded_at: Utc::now().naive_utc(),
        updated_at: Utc::now().naive_utc(),
    };

    diesel::insert_into(user_photo_uploads)
        .values(&new_upload)
        .get_result(conn)
        .map_err(DieselError)
}
pub fn get_latest_user_photo_upload(
    conn: &mut PgConnection,
    uid: i32,
) -> Result<Option<UserPhotoUpload>, DatabaseError> {
    user_photo_uploads
        .filter(user_id.eq(uid))
        .order(uploaded_at.desc())
        .first::<UserPhotoUpload>(conn)
        .optional()
        .map_err(DieselError)
}
pub fn delete_user_photo_upload(
    conn: &mut PgConnection,
    photo_id: i32,
) -> Result<usize, DatabaseError> {
    use crate::schema::user_photo_uploads::dsl::*;
    diesel::delete(user_photo_uploads.filter(id.eq(photo_id)))
        .execute(conn)
        .map_err(DieselError)
}