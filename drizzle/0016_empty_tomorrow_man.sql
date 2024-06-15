ALTER TABLE "stock-control-app_cashRegister" ADD COLUMN "openedById" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_cashRegister" ADD CONSTRAINT "stock-control-app_cashRegister_openedById_stock-control-app_user_id_fk" FOREIGN KEY ("openedById") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
