ALTER TABLE "stock-control-app_product" DROP CONSTRAINT "stock-control-app_product_productId_stock-control-app_product_id_fk";
--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ALTER COLUMN "productId" DROP NOT NULL;