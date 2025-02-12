use diesel::prelude::*;
use serde::{Deserialize, Serialize};


use chrono::{self, DateTime, NaiveDateTime, Utc};

use crate::models::project::Project;
use crate::models::user::User;
use crate::schema::tasks::{self};
use crate::tasks::enums::{Progress,Priority};

use super::task_assignee::TaskWithAssignees;


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
    pub priority : Priority,
    pub created_at:NaiveDateTime,
    // pub created_at:DateTime<Utc>,
    pub due_date: Option<NaiveDateTime>
}

pub struct TaskResponse {
    pub id: i32,
    pub description: String,
    pub reward: i64,
    pub completed: bool,
    pub user_id: Option<i32>,
    pub project_id: i32,
    pub title: String,
    pub progress: String,
    pub priority : String,
    pub created_at : NaiveDateTime,
    pub due_date : Option<NaiveDateTime>

    
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
            progress:task.progress.as_str(),
            priority:task.priority.as_str(),  
            created_at:task.created_at,
            due_date:task.due_date,
                       
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
    pub priority : Priority,
    pub created_at : NaiveDateTime,
    pub due_date : Option<NaiveDateTime>,

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




