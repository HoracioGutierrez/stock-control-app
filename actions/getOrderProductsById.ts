"use server"
import { GeneralResponse } from "@/lib/types"
import { db, orders, purchaseOrders, purchaseOrderProducts, products, productOrders, customers } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getOrderProductsById = async (orderId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const orderFromDB = await db.select({
      id: orders.id,
      total: orders.total,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      createdAt: orders.createdAt,
      name: customers.name,
      lastName: customers.lastName,
    }).from(orders).where(eq(orders.id, orderId)).fullJoin(customers, eq(customers.id, orders.customerId))

    if (orderFromDB.length === 0) throw new Error("La compra no existe")

    const productsFromDB = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        quantity: productOrders.quantity,
        total: sql<number>`${productOrders.quantity} * ${products.price}`.as("total"),
      })
      .from(productOrders)
      .where(eq(productOrders.orderId, orderId))
      .innerJoin(products, eq(productOrders.productId, products.id))
      .orderBy(productOrders.productId)

    return {
      data: {
        products : productsFromDB.length === 0 ? [] : productsFromDB,
        customers : {
          name: orderFromDB[0].name,
          lastName: orderFromDB[0].lastName,
        },
        total: orderFromDB[0].total,
        status: orderFromDB[0].status,
        paymentMethod: orderFromDB[0].paymentMethod,
      },
      error: null,
      message: "Productos encontrados"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: {},
        error: error.message,
        message: error.message
      }
    }

    return {
      data: {},
      error : "Error al obtener los productos",
      message: "Error al obtener los productos"
    }
  }
}
