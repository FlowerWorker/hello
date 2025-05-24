use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use crate::schema::availability_status;

#[derive(Queryable, Insertable, AsChangeset,Serialize)]
#[diesel(table_name = availability_status)]
pub struct AvailabilityStatus {
    pub user_id: i32,
    pub status: String,
    pub updated_at: NaiveDateTime,
}
#[derive(Insertable, Deserialize)]
#[diesel(table_name = availability_status)]
pub struct NewAvailabilityStatus{
    pub user_id: i32,
    pub status: String,
}

#[derive(Deserialize)]
pub struct StatusUpdate {
    pub status: String,
}