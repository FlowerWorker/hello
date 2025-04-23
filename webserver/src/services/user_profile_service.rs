use diesel::prelude::*;
use crate::database::error::DatabaseError;
use crate::database::error::DatabaseError::DieselError;
use crate::models::user_profile::{UserProfile, UserProfileUpdate};
use crate::schema::user_profiles::dsl::*;

pub fn update_user_profile(
    conn: &mut PgConnection,
    uid: i32,
    new_profile: &UserProfileUpdate,
) -> QueryResult<UserProfile> {
    diesel::insert_into(user_profiles)
        .values((
            user_id.eq(uid),
            full_name.eq(&new_profile.full_name),
            email.eq(&new_profile.email),
            phone_number.eq(&new_profile.phone_number),
            department_or_team.eq(&new_profile.department_or_team),
            job_title.eq(&new_profile.job_title),

        ))
        .on_conflict(user_id)
        .do_update()
        .set((
            full_name.eq(&new_profile.full_name),
            email.eq(&new_profile.email),
            phone_number.eq(&new_profile.phone_number),
            department_or_team.eq(&new_profile.department_or_team),
            job_title.eq(&new_profile.job_title),

        ))
        .get_result(conn)

}

pub fn get_user_profile(
    conn: &mut PgConnection,
    uid: i32,
) -> Result<UserProfile, DatabaseError> {
    user_profiles
        .filter(user_id.eq(uid))
        .first::<UserProfile>(conn)
        .map_err(|e| {
            match e {
                diesel::NotFound => DatabaseError::NotFound,
                _ => DieselError(e),
            }
        })
}