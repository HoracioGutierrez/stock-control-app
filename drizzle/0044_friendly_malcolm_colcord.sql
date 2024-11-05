CREATE TABLE IF NOT EXISTS "stock-control-app_help_header" (
	"id" text PRIMARY KEY NOT NULL,
	"helpCardId" text NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "stock-control-app_help_header_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_help_header" ADD CONSTRAINT "stock-control-app_help_header_helpCardId_stock-control-app_help_id_fk" FOREIGN KEY ("helpCardId") REFERENCES "public"."stock-control-app_help"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
