INSERT INTO "events" ("slug", "name", "date", "location")
VALUES ('power-beach-2', 'Power Beach 2.0', '2026-10-24', 'Playa Bahía Grande')
ON CONFLICT ("slug") DO NOTHING;
