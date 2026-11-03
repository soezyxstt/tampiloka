ALTER TABLE "submissions" ADD COLUMN "deleted_at" timestamp with time zone;
UPDATE "submissions" SET "deleted_at" = now() WHERE "status" = 'deleted';
