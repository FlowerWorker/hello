use diesel::prelude::*;
use crate::schema::notification_settings::dsl::*;
use crate::database::error::{DatabaseError, DatabaseError::DieselError};
use crate::models::notification_settings::{NewNotificationSettings, NotificationSettings};
pub fn get_settings(
    conn: &mut PgConnection,
    uid: i32,
) -> Result<NotificationSettings, DatabaseError> {
    notification_settings
        .filter(user_id.eq(uid))
        .select(NotificationSettings::as_select())
        .first::<NotificationSettings>(conn)
        .map_err(|e| match e {
            diesel::NotFound => DatabaseError::NotFound,
            _ => DieselError(e),
        })
}
pub fn upsert_settings(
    conn: &mut PgConnection,
    settings: NewNotificationSettings,
) -> Result<NotificationSettings, DatabaseError> {
    diesel::insert_into(notification_settings)
        .values(&settings)
        .on_conflict(user_id)
        .do_update()
        .set(&settings)
        .get_result::<NotificationSettings>(conn)
        .map_err(DieselError)
}
