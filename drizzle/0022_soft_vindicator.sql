CREATE TABLE IF NOT EXISTS "stock-control-app_cashRegisterOpenning" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"openedAt" timestamp DEFAULT now(),
	"closedAt" timestamp,
	"cashRegisterId" text NOT NULL,
	"startAmount" numeric NOT NULL,
	"endAmount" numeric NOT NULL,
	CONSTRAINT "stock-control-app_cashRegisterOpenning_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_cashRegisterOpenning" ADD CONSTRAINT "stock-control-app_cashRegisterOpenning_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_cashRegisterOpenning" ADD CONSTRAINT "stock-control-app_cashRegisterOpenning_cashRegisterId_stock-control-app_cashRegister_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."stock-control-app_cashRegister"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
