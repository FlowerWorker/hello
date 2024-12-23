use diesel::pg::{Pg, PgValue};
use diesel::{prelude::*, serialize};
use serde::{Deserialize, Serialize};
use diesel::deserialize::{self, FromSql, FromSqlRow};
use diesel::expression::AsExpression;
use diesel::sql_types::Text;

use crate::models::project::Project;
use crate::models::user::User;
use crate::schema::tasks::{self};


#[derive(
    Queryable, Selectable, Serialize, Deserialize, Debug, Associations, Identifiable, PartialEq,
)]
#[diesel(table_name = tasks)]
#[belongs_to(Project)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Task {
    pub id: i32,
    pub description: String,
    pub reward: i64,
    pub completed: bool,
    pub user_id: Option<i32>,
    pub project_id: i32,
    pub title:String,
    pub progress:Progress,
}

pub struct TaskResponse {
    pub id: i32,
    pub description: String,
    pub reward: i64,
    pub completed: bool,
    pub user_id: Option<i32>,
    pub project_id: i32,
    pub title: String,
    pub progress: String
    
}

impl From<Task> for TaskResponse {
    fn from(task: Task) -> Self {
        Self {
            id: task.id,
            description: task.description,
            reward: task.reward,
            completed: task.completed,
            project_id: task.project_id,
            user_id: task.user_id,
            title:task.title,     
            progress: match task.progress {
                Progress::ToDo => "to_do".to_string(),
                Progress::InProgress => "in_progress".to_string(),
                Progress::Completed => "completed".to_string(),
            },            
        }
    }
}

#[derive(Insertable, Debug)]
#[diesel(table_name = tasks)]
pub struct NewTask<'a> {
    pub description: &'a str,
    pub reward: i64,
    pub completed: bool,
    pub project_id: i32,
    pub user_id:Option<i32>,
    pub title: &'a str,
    pub progress: Progress,
}

//user to task many to many relationship
impl Task {
    pub fn with_assignees(self, assignees: Vec<User>) -> TaskWithAssignees {
        TaskWithAssignees {
            task: self,
            assignees,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithAssignees {
    pub task: Task,
    pub assignees: Vec<User>,
}



#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, AsExpression, FromSqlRow)]
#[diesel(sql_type = Text)]
#[serde(rename_all = "snake_case")]
pub enum Progress {
    ToDo,
    InProgress,
    Completed,
}

use diesel::serialize::{IsNull, Output, ToSql, WriteTuple};
use std::io::Write;

impl ToSql<Text, Pg> for Progress {
    fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> serialize::Result {
        match *self {
            Progress::ToDo => out.write_all(b"to_do")?,
            Progress::InProgress => out.write_all(b"in_progress")?,
            Progress::Completed => out.write_all(b"completed")?,
        }
        Ok(IsNull::No)
    }
}

impl FromSql<Text, Pg> for Progress {
    fn from_sql(bytes: PgValue<'_>) -> deserialize::Result<Self> {
        // Convert the raw bytes to a string
        let value = <String as FromSql<Text, Pg>>::from_sql(bytes)?;
        
        // Match the string value to an enum variant
        match value.as_str() {
            "to_do" => Ok(Progress::ToDo),
            "in_progress" => Ok(Progress::InProgress),
            "completed" => Ok(Progress::Completed),
            _ => Err(format!("Unrecognized enum value '{}' for Progress; it should be 'to_do', 'in_progress', or 'completed'", value).into()),        }
    }
}


