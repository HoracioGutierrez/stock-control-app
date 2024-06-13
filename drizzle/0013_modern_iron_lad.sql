CREATE TABLE IF NOT EXISTS "stock-control-app_history" (
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"actionType" text NOT NULL,
	"products" text[] DEFAULT '{}'::text[] NOT NULL,
	"orderId" text,
	"customerId" text,
	"ip" text,
	"userAgent" text,
	CONSTRAINT "stock-control-app_history_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "active" boolean NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_history" ADD CONSTRAINT "stock-control-app_history_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
