ALTER TABLE "stock-control-app_order" ADD COLUMN "cashRegisterId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_order" ADD CONSTRAINT "stock-control-app_order_cashRegisterId_stock-control-app_cashRegister_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."stock-control-app_cashRegister"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
