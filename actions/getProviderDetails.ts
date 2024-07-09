"use server"
import { GeneralResponse } from "@/lib/types"
import { db, providers, purchaseOrders, purchaseOrderProducts, products } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getProviderDetails = async (providerId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const provider = await db.select().from(providers).where(eq(providers.id, providerId))
    if (provider.length === 0) throw new Error("El proveedor no existe")

    const purchaseOrdersFromDB = await db
      .select({
        id: purchaseOrders.id,
        status: purchaseOrders.status,
        createdAt: purchaseOrders.createdAt,
        itemCount: sql<number>`sum(${purchaseOrderProducts.quantity})`.as("itemCount"),
        total: purchaseOrders.total
      })
      .from(purchaseOrders)
      .where(eq(purchaseOrders.providerId, providerId))
      .innerJoin(purchaseOrderProducts, eq(purchaseOrders.id, purchaseOrderProducts.purchaseOrderId))
      .groupBy(purchaseOrders.id)


    if (purchaseOrdersFromDB.length === 0) {

      return {
        data: {
          provider: provider[0],
          purchaseOrders: [],
          purchaseOrderProducts: []
        },
        error: null,
        message: "No hay ordenes de compra"
      }
    }
    const purchaseOrderProductsFromDB = await db
      .select({
        purchaseOrderId: purchaseOrderProducts.purchaseOrderId,
        name: products.name,
        quantity: purchaseOrderProducts.quantity,
        price: products.price
      })
      .from(purchaseOrderProducts)
      .where(eq(purchaseOrderProducts.purchaseOrderId, purchaseOrdersFromDB[0].id))
      .innerJoin(products, eq(purchaseOrderProducts.productId, products.id))



    return {
      data: {
        provider: provider[0],
        purchaseOrders: purchaseOrdersFromDB,
        purchaseOrderProducts: purchaseOrderProductsFromDB
      },
      error: null,
      message: "Proveedor encontrado"
    }


  } catch (error) {
    if (error instanceof Error) {
      return {
        data: {
          provider : {},
          purchaseOrders: [],
          purchaseOrderProducts: []
        },
        error: error.message,
        message: error.message
      }
    }

    return {
      data: {
        provider : {},
        purchaseOrders: [],
        purchaseOrderProducts: []
      },
      error: "Error al obtener los proveedores",
      message: "Error al obtener los proveedores"
    }
  }
}   