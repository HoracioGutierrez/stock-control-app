DO $$ BEGIN
 ALTER TABLE "stock-control-app_order" ADD CONSTRAINT "stock-control-app_order_customerId_stock-control-app_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."stock-control-app_customer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
