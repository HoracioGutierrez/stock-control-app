"use server"
import { GeneralResponse } from "@/lib/types"
import { db, providers, purchaseOrderProducts, purchaseOrders } from "@/schema"
import { eq, sql } from "drizzle-orm"

export const getAllProviders = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {

    let providersFromDb: any
    if (inactive) {

      const subPO = db
        .select({
          providerId: purchaseOrders.providerId,
          total: sql<number>`sum(${purchaseOrders.total})`.as("total")
        })
        .from(purchaseOrders)
        .groupBy(purchaseOrders.providerId)
        .as('po_totals');

      const subPOproducts = db
        .select({
          providerId: purchaseOrders.providerId,
          totalQuantity: sql<number>`sum(${purchaseOrderProducts.quantity})`.as("totalQuantity")
        })
        .from(purchaseOrderProducts)
        .innerJoin(purchaseOrders, eq(purchaseOrderProducts.purchaseOrderId, purchaseOrders.id))
        .groupBy(purchaseOrders.providerId)
        .as('pop_totals');

      await db.select({
        id: providers.id,
        name: providers.name,
        lastName: providers.lastName,
        companyName: providers.companyName,
        address: providers.address,
        phone: providers.phone,
        email: providers.email,
        cuitCuil: providers.cuitCuil,
        active: providers.active,
        totalSpent: subPO.total,
        productsCount: subPOproducts.totalQuantity
      })
        .from(providers)
        .leftJoin(subPO, eq(subPO.providerId, providers.id))
        .leftJoin(subPOproducts, eq(subPOproducts.providerId, providers.id))
        .orderBy(providers.name);
    } else {

      const subPO = db
        .select({
          providerId: purchaseOrders.providerId,
          total: sql<number>`sum(${purchaseOrders.total})`.as("total")
        })
        .from(purchaseOrders)
        .groupBy(purchaseOrders.providerId)
        .as('po_totals');

      const subPOproducts = db
        .select({
          providerId: purchaseOrders.providerId,
          totalQuantity: sql<number>`sum(${purchaseOrderProducts.quantity})`.as("totalQuantity")
        })
        .from(purchaseOrderProducts)
        .innerJoin(purchaseOrders, eq(purchaseOrderProducts.purchaseOrderId, purchaseOrders.id))
        .groupBy(purchaseOrders.providerId)
        .as('pop_totals');

      providersFromDb = await db.select({
        id: providers.id,
        name: providers.name,
        lastName: providers.lastName,
        companyName: providers.companyName,
        address: providers.address,
        phone: providers.phone,
        email: providers.email,
        cuitCuil: providers.cuitCuil,
        active: providers.active,
        totalSpent: subPO.total,
        productsCount: subPOproducts.totalQuantity
      })
        .from(providers)
        .where(eq(providers.active, true))
        .leftJoin(subPO, eq(subPO.providerId, providers.id))
        .leftJoin(subPOproducts, eq(subPOproducts.providerId, providers.id))
        .orderBy(providers.name);
    }

    return {
      data: providersFromDb,
      error: null,
      message: "Proveedores encontrados"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener los proveedores"
      }
    }


    return {
      data: null,
      error: "Error al obtener los proveedores",
      message: "Error al obtener los proveedores"
    }
  }
}