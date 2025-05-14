use chrono::{NaiveDateTime, NaiveTime};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::notification_settings;
#[derive(Queryable, Selectable, AsChangeset, Serialize, Clone)]
#[diesel(table_name = notification_settings)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NotificationSettings {
    pub user_id: i32,
    pub all_new_messages: Option<bool>,
    pub direct_messages: Option<bool>,
    pub thread_replies: Option<bool>,
    pub schedule: Option<String>,
    pub start_hour: Option<NaiveTime>,
    pub end_hour: Option<NaiveTime>,
    pub remind_at: Option<NaiveTime>,
    pub mobile_frequency: Option<String>,
    pub incoming_pref: Option<String>,
    pub outgoing_pref: Option<String>,
    pub mute_all_sounds: Option<bool>,
    pub email_frequency: Option<String>,
    pub time_zone: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
    pub incoming_sound: Option<String>,
    pub outgoing_sound: Option<String>,
    pub auto_time_zone: bool,
}
#[derive(Insertable, AsChangeset, Deserialize, Clone)]
#[diesel(table_name = notification_settings)]
pub struct NewNotificationSettings {
    pub user_id: i32,
    pub all_new_messages: Option<bool>,
    pub direct_messages: Option<bool>,
    pub thread_replies: Option<bool>,
    pub schedule: Option<String>,
    pub start_hour: Option<NaiveTime>,
    pub end_hour: Option<NaiveTime>,
    pub remind_at: Option<NaiveTime>,
    pub mobile_frequency: Option<String>,
    pub incoming_pref: Option<String>,
    pub outgoing_pref: Option<String>,
    pub mute_all_sounds: Option<bool>,
    pub email_frequency: Option<String>,
    pub time_zone: Option<String>,
    pub incoming_sound: Option<String>,
    pub outgoing_sound: Option<String>,
    pub auto_time_zone: bool,
}
#[derive(Deserialize)]
pub struct NotificationSettingsInput {
    pub all_new_messages: Option<bool>,
    pub direct_messages: Option<bool>,
    pub thread_replies: Option<bool>,
    pub schedule: Option<String>,
    pub start_hour: Option<NaiveTime>,
    pub end_hour: Option<NaiveTime>,
    pub remind_at: Option<NaiveTime>,
    pub mobile_frequency: Option<String>,
    pub incoming_pref: Option<String>,
    pub outgoing_pref: Option<String>,
    pub mute_all_sounds: Option<bool>,
    pub email_frequency: Option<String>,
    pub time_zone: Option<String>,
    pub incoming_sound: Option<String>,
    pub outgoing_sound: Option<String>,
    pub auto_time_zone: bool,
}
impl From<(i32, NotificationSettingsInput)> for NewNotificationSettings {
    fn from((user_id, input): (i32, NotificationSettingsInput)) -> Self {
        Self {
            user_id,
            all_new_messages: input.all_new_messages,
            direct_messages: input.direct_messages,
            thread_replies: input.thread_replies,
            schedule: input.schedule,
            start_hour: input.start_hour,
            end_hour: input.end_hour,
            remind_at: input.remind_at,
            mobile_frequency: input.mobile_frequency,
            incoming_pref: input.incoming_pref,
            outgoing_pref: input.outgoing_pref,
            mute_all_sounds: input.mute_all_sounds,
            email_frequency: input.email_frequency,
            time_zone: input.time_zone,
            incoming_sound: input.incoming_sound.clone(),
            outgoing_sound: input.outgoing_sound.clone(),
            auto_time_zone: input.auto_time_zone,
        }
    }
}
#[derive(Serialize)]
pub struct NotificationSettingsResponse {
    pub all_new_messages: Option<bool>,
    pub direct_messages: Option<bool>,
    pub thread_replies: Option<bool>,
    pub schedule: Option<String>,
    pub start_hour: Option<NaiveTime>,
    pub end_hour: Option<NaiveTime>,
    pub remind_at: Option<NaiveTime>,
    pub mobile_frequency: Option<String>,
    pub incoming_pref: Option<String>,
    pub outgoing_pref: Option<String>,
    pub mute_all_sounds: Option<bool>,
    pub email_frequency: Option<String>,
    pub time_zone: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
    pub incoming_sound: Option<String>,
    pub outgoing_sound: Option<String>,
    pub auto_time_zone: bool,
}
impl From<NotificationSettings> for NotificationSettingsResponse {
    fn from(settings: NotificationSettings) -> Self {
        Self {
            all_new_messages: settings.all_new_messages,
            direct_messages: settings.direct_messages,
            thread_replies: settings.thread_replies,
            schedule: settings.schedule,
            start_hour: settings.start_hour,
            end_hour: settings.end_hour,
            remind_at: settings.remind_at,
            mobile_frequency: settings.mobile_frequency,
            incoming_pref: settings.incoming_pref,
            outgoing_pref: settings.outgoing_pref,
            mute_all_sounds: settings.mute_all_sounds,
            email_frequency: settings.email_frequency,
            time_zone: settings.time_zone,
            created_at: settings.created_at,
            updated_at: settings.updated_at,
            incoming_sound: settings.incoming_sound,
            outgoing_sound: settings.outgoing_sound,
            auto_time_zone:settings.auto_time_zone,
        }
    }
}

