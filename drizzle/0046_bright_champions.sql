CREATE TABLE IF NOT EXISTS "stock-control-app_help_accordion" (
	"id" text PRIMARY KEY NOT NULL,
	"helpCardId" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "stock-control-app_help_accordion_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "stock-control-app_help_content" ADD COLUMN "warningDescription" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_help_accordion" ADD CONSTRAINT "stock-control-app_help_accordion_helpCardId_stock-control-app_help_id_fk" FOREIGN KEY ("helpCardId") REFERENCES "public"."stock-control-app_help"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "stock-control-app_help_content" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "stock-control-app_help_content" DROP COLUMN IF EXISTS "subTitle";