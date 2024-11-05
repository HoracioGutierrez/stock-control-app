ALTER TABLE "stock-control-app_help_content" RENAME COLUMN "helpCardId" TO "helpAccordionId";--> statement-breakpoint
ALTER TABLE "stock-control-app_help_content" DROP CONSTRAINT "stock-control-app_help_content_helpCardId_stock-control-app_help_accordion_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_help_content" ADD CONSTRAINT "stock-control-app_help_content_helpAccordionId_stock-control-app_help_accordion_id_fk" FOREIGN KEY ("helpAccordionId") REFERENCES "public"."stock-control-app_help_accordion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
