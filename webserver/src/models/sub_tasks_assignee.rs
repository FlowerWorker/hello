use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::subtask_assignees;

use super::{sub_tasks::SubTask, user::User};

#[derive(Insertable)]
#[diesel(table_name = subtask_assignees)]
#[diesel(belongs_to(User))]
#[diesel(belongs_to(Task))]
#[diesel(primary_key(sub_task_id, user_id))] 
pub struct SubTaskAssignee {
    pub sub_task_id: i32,
    pub user_id: i32,
    pub task_id: i32,
    pub assigned_at: chrono::NaiveDateTime
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SubTaskWithAssignees {
    pub sub_task: SubTask,
    pub assignees: Vec<User>,
}

#[derive(Insertable)]
#[diesel(table_name = subtask_assignees)]
pub struct NewSubTaskAssignee {
    pub sub_task_id: i32,
    pub user_id: i32,
    pub task_id: i32,
    pub assigned_at: Option<chrono::NaiveDateTime>,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct SubTaskWithAssignedUsers {
    pub sub_task:SubTask ,
    pub assignees: Vec<i32>,
    pub task_id: i32,
    pub assigned_at: chrono::NaiveDateTime
}
