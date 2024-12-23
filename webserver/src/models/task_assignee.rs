use diesel::prelude::*;

use crate::{models::{task::Task, user::User}, schema::task_assignees};

#[derive(Insertable, Associations, Identifiable, Queryable, Debug)]
#[diesel(table_name = task_assignees)]
#[diesel(belongs_to(Task))]
#[diesel(belongs_to(User))]
#[diesel(primary_key(task_id, user_id))] 
pub struct TaskAssignee {
    pub task_id: i32,
    pub user_id: i32,
    pub assigned_at: Option<chrono::NaiveDateTime>, 
}

#[derive(Insertable)]
#[diesel(table_name = task_assignees)]
pub struct NewTaskAssignee {
    pub task_id: i32,
    pub user_id: i32,
}
