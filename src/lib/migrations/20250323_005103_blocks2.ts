import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_block" DROP CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_media_block_media_idx";
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "position";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "media_id";
  DROP TYPE "public"."enum_pages_blocks_media_block_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_block_position" AS ENUM('default', 'fullscreen');
  ALTER TABLE "pages_blocks_media_block" RENAME COLUMN "title" TO "position";
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "media_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");`)
}
