ALTER TABLE "stock-control-app_user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_user" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "stock-control-app_user" ADD COLUMN "isAdmin" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_user" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "stock-control-app_user" ADD COLUMN "updatedAt" timestamp;