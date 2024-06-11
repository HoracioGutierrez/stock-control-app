ALTER TABLE "stock-control-app_product" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "isVariant" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "productId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock-control-app_product" ADD CONSTRAINT "stock-control-app_product_productId_stock-control-app_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."stock-control-app_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
