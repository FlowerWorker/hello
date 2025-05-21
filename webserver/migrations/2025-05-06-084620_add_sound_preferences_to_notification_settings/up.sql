-- Your SQL goes here
ALTER TABLE notification_settings
ADD COLUMN incoming_sound TEXT,
ADD COLUMN outgoing_sound TEXT;

