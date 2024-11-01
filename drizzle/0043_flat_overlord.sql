CREATE TABLE IF NOT EXISTS "stock-control-app_help" (
	"id" text PRIMARY KEY NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "stock-control-app_help_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock-control-app_help_content" (
	"id" text PRIMARY KEY NOT NULL,
	"helpCardId" text NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"SubTitle" text,
	"description" text NOT NULL,
	"subDescription" text,
	"image" text NOT NULL,
	"warning" text,
	"subWarning" text,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "stock-control-app_help_content_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_help_content" ADD CONSTRAINT "stock-control-app_help_content_helpCardId_stock-control-app_help_id_fk" FOREIGN KEY ("helpCardId") REFERENCES "public"."stock-control-app_help"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
