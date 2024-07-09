CREATE TABLE IF NOT EXISTS "stock-control-app_order" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"total" numeric NOT NULL,
	"status" text NOT NULL,
	"customerId" text,
	"ip" text,
	"userAgent" text,
	CONSTRAINT "stock-control-app_order_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock-control-app_productOrder" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"productId" text NOT NULL,
	"quantity" numeric NOT NULL,
	CONSTRAINT "stock-control-app_productOrder_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_order" ADD CONSTRAINT "stock-control-app_order_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_productOrder" ADD CONSTRAINT "stock-control-app_productOrder_orderId_stock-control-app_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."stock-control-app_order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_productOrder" ADD CONSTRAINT "stock-control-app_productOrder_productId_stock-control-app_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."stock-control-app_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
