use chrono::{ NaiveDate, NaiveDateTime, NaiveTime, TimeZone, Timelike, Utc};
use diesel::prelude::*;

use crate::database::error::DatabaseError;
use crate::models::task::Task;
use crate::models::task_accsses::TaskAccess;

use super::error::ValidationError;

use chrono_tz::Tz;  


pub fn parse_and_validate_due_date(
    due_date: Option<String>,
    user_timezone_str: Option<String>,  
) -> Result<Option<NaiveDateTime>, ValidationError> {
    
    let user_timezone = match user_timezone_str {
        Some(tz) => tz.parse::<Tz>().map_err(|_| ValidationError {
            message: format!("Invalid timezone: '{}'", tz),
        })?,
        None => "UTC".parse::<Tz>().unwrap(), // Default to UTC if not provided
    };

    if let Some(date_str) = due_date {
        // Parse date and time dynamically, including seconds if available
        let parsed_date = if date_str.contains(':') {
            // Format: DD-MM-YYYY HH:mm (HH:mm might be optional)
            NaiveDateTime::parse_from_str(&date_str, "%d-%m-%Y %H:%M")
                .map(|dt| {
                    // Extract hour, minute, and second dynamically
                    let hour = dt.time().hour();
                    let minute = dt.time().minute();
                    let second = dt.time().second(); 
                    let microsecond = dt.time().nanosecond() / 1000;

                    // Convert to full format with microseconds
                    NaiveDateTime::new(
                        dt.date(),
                        NaiveTime::from_hms_micro_opt(hour, minute, second, microsecond).unwrap()
                    )
                })
        } else {
            // Format: DD-MM-YYYY (No time, set to 00:00:00.000000)
            NaiveDate::parse_from_str(&date_str, "%d-%m-%Y")
                .map(|date| {
                    NaiveDateTime::new(
                        date,
                        NaiveTime::from_hms_micro_opt(0, 0, 0, 0).unwrap() 
                    )
                })
        }
        .map_err(|_| ValidationError {
            message: format!(
                "Invalid due_date format: '{}'. Expected formats:\n\
                 - DD-MM-YYYY HH:mm\n\
                 - DD-MM-YYYY",
                date_str
            ),
        })?;

        // Step 2: Convert the due date to UTC using the user timezone
        let utc_due_date = convert_to_utc(parsed_date, &user_timezone);

        // Step 3: Ensure the date is in the future
        if utc_due_date < Utc::now().naive_utc() {
            return Err(ValidationError {
                message: format!("Invalid due_date: {} ,please provide a future date.", utc_due_date),
            });
        }

        Ok(Some(utc_due_date))
    } else {
        Ok(None) // No due_date provided
    }
}

// Convert the parsed due date (in user's local time) to UTC
fn convert_to_utc(due_date: NaiveDateTime, user_timezone: &Tz) -> NaiveDateTime {
    let local_time = user_timezone
        .from_local_datetime(&due_date)
        .single()
        .expect("Invalid local datetime");

    // Convert local time to UTC
    let utc_time = local_time.with_timezone(&Utc);

    // Return UTC time as NaiveDateTime (which does not store timezone info)
    utc_time.naive_utc()
}


pub(crate) fn validate_task_ownership(
    conn: &mut PgConnection,
    task_id: i32,
    user_id: i32,
) -> Result<Task, DatabaseError> {
    use crate::schema::{task_access::dsl as task_access_dsl, tasks::dsl as tasks_dsl};

    // First, check if the user is the owner of the task
    let task = tasks_dsl::tasks
        .filter(tasks_dsl::id.eq(task_id))
        .filter(tasks_dsl::user_id.eq(user_id))
        .first::<Task>(conn)
        .optional()?;

    // If the task exists and the user is the owner, return the task
    if let Some(task) = task {
        return Ok(task);
    }

    // If the user is not the creator, check if the user has explicit access
    let has_access = task_access_dsl::task_access
        .filter(task_access_dsl::task_id.eq(task_id))
        .filter(task_access_dsl::user_id.eq(user_id))
        .first::<TaskAccess>(conn)
        .optional()?;

    // If the user has access, return the task
    if has_access.is_some() {
        let task = tasks_dsl::tasks
            .find(task_id)
            .first::<Task>(conn)?;

        return Ok(task);
    }

    // If neither the user is the owner nor has access, return an error
    Err(DatabaseError::PermissionDenied)
}


pub(crate) fn validate_user_project_access(
    conn: &mut PgConnection,
    user_id: i32,
    project_id: i32,
) -> Result<crate::models::project::Project, DatabaseError> {
    use crate::schema::{task_access::dsl as task_access_dsl, tasks::dsl as tasks_dsl, projects::dsl as projects_dsl};

    // Check if the user is the creator of the project
    let project = projects_dsl::projects
        .filter(projects_dsl::id.eq(project_id))
        .filter(projects_dsl::user_id.eq(user_id))
        .first::<crate::models::project::Project>(conn)
        .optional()?;

    // If the project exists and the user is the creator, return the project
    if let Some(project) = project {
        return Ok(project);
    }

    // Check if the user has access to any task in the project
    // We need to check if the user has access to tasks in the project
    let has_access = task_access_dsl::task_access
        .inner_join(tasks_dsl::tasks.on(tasks_dsl::id.eq(task_access_dsl::task_id)))
        .filter(tasks_dsl::project_id.eq(project_id))  // Ensure the task belongs to the project
        .filter(task_access_dsl::user_id.eq(user_id))  // Ensure the user has explicit access to the task
        .select(task_access_dsl::task_id)  // Only select the task_id, no need to load full TaskAccess
        .first::<i32>(conn)
        .optional()?;  // Expecting an optional result of task_id

    // If the user has access to any task in the project, return the project
    if let Some(_) = has_access {
        let project = projects_dsl::projects
            .find(project_id)
            .first::<crate::models::project::Project>(conn)?;

        return Ok(project);
    }

    // If the user is neither the creator nor has access to tasks in the project, return an error
    Err(DatabaseError::PermissionDenied)
}
