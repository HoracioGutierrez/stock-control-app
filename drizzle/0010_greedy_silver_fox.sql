ALTER TABLE "stock-control-app_supplier" RENAME TO "stock-control-app_client";--> statement-breakpoint
ALTER TABLE "stock-control-app_client" DROP COLUMN IF EXISTS "clientId";