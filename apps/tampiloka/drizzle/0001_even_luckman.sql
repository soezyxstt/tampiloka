ALTER TABLE "assets" ADD COLUMN "revision_id" text;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "question_id" text;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_revision_id_form_revisions_id_fk" FOREIGN KEY ("revision_id") REFERENCES "public"."form_revisions"("id") ON DELETE no action ON UPDATE no action;