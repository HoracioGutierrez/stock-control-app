ALTER TABLE "stock-control-app_product" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock-control-app_product" ADD COLUMN "active" boolean NOT NULL;