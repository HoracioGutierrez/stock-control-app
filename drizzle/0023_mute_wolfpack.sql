ALTER TABLE "stock-control-app_cashRegister" ADD COLUMN "currentOpenningId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_cashRegister" ADD CONSTRAINT "stock-control-app_cashRegister_currentOpenningId_stock-control-app_cashRegisterOpenning_id_fk" FOREIGN KEY ("currentOpenningId") REFERENCES "public"."stock-control-app_cashRegisterOpenning"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
