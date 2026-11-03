ALTER TABLE "assets" ADD CONSTRAINT "assets_state_check" CHECK ("assets"."state" in ('pending','uploaded','attached','deleted'));--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_size_check" CHECK ("assets"."size" > 0);--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_status_check" CHECK ("forms"."status" in ('draft','published','closed','archived','deleted'));--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_version_check" CHECK ("forms"."draft_version" > 0);--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_status_check" CHECK ("submissions"."status" in ('active','archived','deleted'));