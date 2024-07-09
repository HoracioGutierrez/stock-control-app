ALTER TABLE "stock-control-app_generalBalance" ADD COLUMN "operationType" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_generalBalance" ADD COLUMN "detail" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock-control-app_generalBalance" DROP COLUMN IF EXISTS "currentAmount";