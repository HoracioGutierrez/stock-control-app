CREATE TABLE IF NOT EXISTS "stock-control-app_cashRegister" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"label" text NOT NULL,
	"currentAmount" numeric NOT NULL,
	"totalAmount" numeric NOT NULL,
	CONSTRAINT "stock-control-app_cashRegister_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_cashRegister" ADD CONSTRAINT "stock-control-app_cashRegister_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
