CREATE TABLE IF NOT EXISTS "stock-control-app_purchaseOrderProduct" (
	"id" text PRIMARY KEY NOT NULL,
	"purchaseOrderId" text NOT NULL,
	"productId" text NOT NULL,
	"quantity" numeric NOT NULL,
	CONSTRAINT "stock-control-app_purchaseOrderProduct_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock-control-app_purchaseOrder" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"total" numeric NOT NULL,
	"status" text NOT NULL,
	"cashRegisterId" text,
	"providerId" text,
	CONSTRAINT "stock-control-app_purchaseOrder_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_purchaseOrderProduct" ADD CONSTRAINT "stock-control-app_purchaseOrderProduct_purchaseOrderId_stock-control-app_purchaseOrder_id_fk" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."stock-control-app_purchaseOrder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_purchaseOrderProduct" ADD CONSTRAINT "stock-control-app_purchaseOrderProduct_productId_stock-control-app_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."stock-control-app_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_purchaseOrder" ADD CONSTRAINT "stock-control-app_purchaseOrder_userId_stock-control-app_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."stock-control-app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_purchaseOrder" ADD CONSTRAINT "stock-control-app_purchaseOrder_cashRegisterId_stock-control-app_cashRegister_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."stock-control-app_cashRegister"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_purchaseOrder" ADD CONSTRAINT "stock-control-app_purchaseOrder_providerId_stock-control-app_provider_id_fk" FOREIGN KEY ("providerId") REFERENCES "public"."stock-control-app_provider"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
