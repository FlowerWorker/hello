// @generated automatically by Diesel CLI.

diesel::table! {
    jobs (id) {
        id -> Int4,
        user_id -> Int4,
        job_title -> Varchar,
        company_name -> Varchar,
        company_logo -> Nullable<Varchar>,
        company_location -> Varchar,
        company_ranking -> Int4,
        employment_type -> Varchar,
        time_schedule -> Varchar,
        workplace_type -> Varchar,
        department -> Varchar,
        job_description -> Text,
        responsabilities -> Text,
        qualifications -> Text,
        required_skills -> Array<Nullable<Text>>,
        preferred_skills -> Array<Nullable<Text>>,
        experience_level -> Varchar,
        min_salary -> Int8,
        max_salary -> Int8,
        comp_structure -> Varchar,
        currency -> Varchar,
        benefits_and_perks -> Text,
        work_hours_flexibile -> Bool,
        apply_through_platform -> Bool,
        external_url -> Nullable<Varchar>,
        email -> Nullable<Varchar>,
        audience_type -> Varchar,
        target_candidates -> Varchar,
        candidate_recommendations -> Bool,
        jobs_screening_questions -> Nullable<Array<Nullable<Text>>>,
        created_at -> Timestamp,
    }
}

diesel::table! {
    projects (id) {
        id -> Int4,
        user_id -> Int4,
        #[max_length = 255]
        title -> Varchar,
        description -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    sub_tasks (id) {
        id -> Int4,
        task_id -> Int4,
        title -> Varchar,
        description -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        due_date -> Nullable<Timestamp>,
        priority -> Varchar,
        progress -> Varchar,
        user_id -> Int4,
        completed -> Bool,
    }
}

diesel::table! {
    subtask_assignees (id) {
        id -> Int4,
        sub_task_id -> Int4,
        user_id -> Int4,
        task_id -> Int4,
        assigned_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    task_access (id) {
        id -> Int4,
        task_id -> Int4,
        user_id -> Int4,
    }
}

diesel::table! {
    task_assignees (task_id, user_id) {
        task_id -> Int4,
        user_id -> Int4,
        assigned_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    tasks (id) {
        id -> Int4,
        description -> Text,
        reward -> Int8,
        completed -> Bool,
        user_id -> Nullable<Int4>,
        project_id -> Int4,
        title -> Varchar,
        progress -> Varchar,
        priority -> Varchar,
        created_at -> Timestamp,
        due_date -> Nullable<Timestamp>,
    }
}

diesel::table! {
    user_tasks (id) {
        id -> Int4,
        user_id -> Int4,
        task_id -> Int4,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        password_hash -> Varchar,
        email -> Varchar,
        created_at -> Timestamp,
    }
}

diesel::joinable!(jobs -> users (user_id));
diesel::joinable!(projects -> users (user_id));
diesel::joinable!(sub_tasks -> tasks (task_id));
diesel::joinable!(sub_tasks -> users (user_id));
diesel::joinable!(subtask_assignees -> sub_tasks (sub_task_id));
diesel::joinable!(subtask_assignees -> tasks (task_id));
diesel::joinable!(subtask_assignees -> users (user_id));
diesel::joinable!(task_access -> tasks (task_id));
diesel::joinable!(task_access -> users (user_id));
diesel::joinable!(task_assignees -> tasks (task_id));
diesel::joinable!(task_assignees -> users (user_id));
diesel::joinable!(tasks -> projects (project_id));
diesel::joinable!(tasks -> users (user_id));
diesel::joinable!(user_tasks -> tasks (task_id));
diesel::joinable!(user_tasks -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    jobs,
    projects,
    sub_tasks,
    subtask_assignees,
    task_access,
    task_assignees,
    tasks,
    user_tasks,
    users,
);
