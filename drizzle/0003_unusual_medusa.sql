CREATE TABLE IF NOT EXISTS "stock-control-app_product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"quantity" numeric NOT NULL,
	"barcode" text NOT NULL,
	"stock" numeric NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "stock-control-app_product_userId_id_pk" PRIMARY KEY("userId","id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_product" ADD CONSTRAINT "stock-control-app_product_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
