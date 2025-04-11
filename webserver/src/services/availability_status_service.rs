use diesel::prelude::*;
use crate::models::availability_status::{AvailabilityStatus, NewAvailabilityStatus};
use crate::schema::availability_status::dsl::*;

pub fn set_status(
    conn: &mut PgConnection,
    new_status: NewAvailabilityStatus,
) -> QueryResult<AvailabilityStatus> {
    let NewAvailabilityStatus { user_id: uid, status: user_status } = new_status;

    diesel::insert_into(availability_status)
        .values(&NewAvailabilityStatus {
            user_id: uid,
            status: user_status.clone(),
        })
        .on_conflict(user_id)
        .do_update()
        .set(status.eq(user_status))
        .get_result(conn)
}

pub fn get_status(
    conn: &mut PgConnection,
    uid: i32,
) -> QueryResult<AvailabilityStatus> {
    availability_status
        .filter(user_id.eq(uid))
        .first::<AvailabilityStatus>(conn)
}
