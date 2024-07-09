ALTER TABLE "stock-control-app_supplier" ADD COLUMN "id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "lastName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "legalName" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "cuitCuil" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "stock-control-app_supplier" ADD COLUMN "clientId" text;