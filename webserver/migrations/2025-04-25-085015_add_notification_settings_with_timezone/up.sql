-- Your SQL goes here
CREATE TABLE notification_settings (
   user_id INT NOT NULL PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
   all_new_messages BOOLEAN,
   direct_messages BOOLEAN,
   thread_replies BOOLEAN,
   schedule TEXT,
   start_hour TIME,
   end_hour TIME,
   remind_at TIME,
   mobile_frequency TEXT,
   incoming_pref TEXT,
   outgoing_pref TEXT,
   mute_all_sounds BOOLEAN,
   email_frequency TEXT,
   time_zone TEXT,
   created_at TIMESTAMP DEFAULT NOW(),
   updated_at TIMESTAMP DEFAULT NOW()
);