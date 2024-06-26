"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, products } from "@/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const updatePrices = async (applyToAll: boolean, selectedColumns: string[], operationType: string, unitType: string, amount: number, userId: string): Promise<GeneralResponse> => {
  "use server"

  const operationQueries: Record<string, any> = {
    add: {
      gross: sql`${products.price} + ${amount}`,
      percentage: sql`${products.price} + ${amount} * ${products.price} / 100`,
    },
    remove: {
      gross: sql`${products.price} - ${amount}`,
      percentage: sql`${products.price} - ${amount} * ${products.price} / 100`,
    },
  }

  try {
    if (applyToAll) {
      await db
        .update(products)
        .set({
          price: operationQueries[operationType][unitType]
        })
        .returning({
          updatedId: products.id
        })

      await db.insert(history).values({
        userId: userId,
        actionType: "update-prices-all",
        products: [],
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })

    } else {
      selectedColumns.forEach(async (column: string) => {
        await db
          .update(products)
          .set({
            price: operationQueries[operationType][unitType]
          })
          .where(eq(products.id, column))
          .returning({
            updatedId: products.id
          })
      })

      await db.insert(history).values({
        userId: userId,
        actionType: "update-prices-some",
        products: selectedColumns,
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })
    }


    revalidatePath("/products")

    return {
      data: null,
      error: null,
      message: "Precios actualizados correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al actualizar los precios"
      }
    }
    return {
      data: null,
      error: "Error al actualizar los precios",
      message: "Error al actualizar los precios"
    }
  }
}