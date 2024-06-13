CREATE TABLE IF NOT EXISTS "stock-control-app_supplier" (

);
--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ALTER COLUMN "updatedAt" SET DEFAULT now();