CREATE TABLE IF NOT EXISTS "stock-control-app_provider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"lastName" text NOT NULL,
	"companyName" text NOT NULL,
	"address" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"cuitCuil" text NOT NULL,
	CONSTRAINT "stock-control-app_provider_id_unique" UNIQUE("id")
);
