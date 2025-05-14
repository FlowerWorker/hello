-- This file should undo anything in `up.sql`
ALTER TABLE notification_settings
DROP COLUMN incoming_sound,
DROP COLUMN outgoing_sound;
