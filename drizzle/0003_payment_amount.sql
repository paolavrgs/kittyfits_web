ALTER TABLE "registrations" ADD COLUMN "amount_bs" numeric(14, 2);--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "bcv_rate" numeric(14, 4);--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "bcv_rate_date" date;