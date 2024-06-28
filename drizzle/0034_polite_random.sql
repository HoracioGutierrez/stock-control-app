CREATE TABLE IF NOT EXISTS "stock-control-app_generalBalance" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"incomingAmount" numeric NOT NULL,
	"currentAmount" numeric NOT NULL,
	"balance" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "stock-control-app_generalBalance_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_generalBalance" ADD CONSTRAINT "stock-control-app_generalBalance_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
