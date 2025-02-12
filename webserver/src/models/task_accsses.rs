use diesel::prelude::*;

use crate::{models::{task::Task, user::User}, schema::task_access};

#[derive(Queryable, Insertable, Identifiable, Associations)]
#[diesel(belongs_to(Task))]
#[diesel(belongs_to(User))]
#[diesel(table_name = task_access)]
pub struct TaskAccess {
    pub id: i32,
    pub task_id: i32,
    pub user_id: i32,
}
