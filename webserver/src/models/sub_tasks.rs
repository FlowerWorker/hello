use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::task::Task;
use crate::schema::sub_tasks;

use crate::tasks::enums::{Priority, Progress};




#[derive(Serialize, Deserialize, Debug)]
pub struct TaskWithSubTasks {
    pub task: Task,
    pub subtasks: Vec<SubTask>,
}

#[derive(
    Queryable, Selectable, Serialize, Deserialize, Debug, Associations, Identifiable, PartialEq,
)]
#[diesel(table_name = sub_tasks)]
#[belongs_to(Task)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct SubTask {
    pub id: i32,
    pub task_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub due_date: Option<NaiveDateTime>,
    pub priority: Priority,
    pub progress : Progress,
    pub user_id: i32,
    pub completed:bool,
}

#[derive(Insertable, Debug)]
#[diesel(table_name = sub_tasks)]
pub struct NewSubTask<'a> {
    pub task_id : i32,
    pub title: &'a str,
    pub description: &'a str,
    pub created_at : NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub due_date : Option<NaiveDateTime>,
    pub priority : Priority,
    pub progress : Progress,
    pub user_id: i32,
    pub completed:bool

}

