// @generated automatically by Diesel CLI.

diesel::table! {
    ai_consultants (id) {
        id -> Int4,
        consultant_pubkey -> Text,
        consultant_skills -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    ai_matches (id) {
        id -> Int4,
        consultant_id -> Nullable<Int4>,
        client_requirements -> Text,
        match_timestamp -> Timestamp,
    }
}

diesel::table! {
    governance_proposals (id) {
        id -> Int4,
        proposal_text -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    governance_votes (id) {
        id -> Int4,
        proposal_id -> Nullable<Int4>,
        voter_pubkey -> Text,
        vote -> Bool,
        created_at -> Timestamp,
    }
}

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
    staking_positions (id) {
        id -> Int8,
        user_pubkey -> Varchar,
        staked_amount -> Int8,
        lock_period_days -> Int4,
        created_at -> Timestamp,
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
        progress -> Varchar,
        title -> Varchar,
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

diesel::joinable!(ai_matches -> ai_consultants (consultant_id));
diesel::joinable!(governance_votes -> governance_proposals (proposal_id));
diesel::joinable!(jobs -> users (user_id));
diesel::joinable!(projects -> users (user_id));
diesel::joinable!(task_assignees -> tasks (task_id));
diesel::joinable!(task_assignees -> users (user_id));
diesel::joinable!(tasks -> projects (project_id));
diesel::joinable!(tasks -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    ai_consultants,
    ai_matches,
    governance_proposals,
    governance_votes,
    jobs,
    projects,
    staking_positions,
    task_assignees,
    tasks,
    users,
);
