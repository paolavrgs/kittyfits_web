ALTER TABLE "events" ADD COLUMN "capacity" integer;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "status" text DEFAULT 'confirmed' NOT NULL;--> statement-breakpoint
UPDATE "events" SET "capacity" = 24 WHERE "slug" = 'power-beach-2';
