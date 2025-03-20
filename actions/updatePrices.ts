"use server"
import { GeneralResponse } from "@/lib/types"
import { db, history, products, users } from "@/schema"
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

    const res = await db.transaction(async (tx) => {

      const user = await tx.select().from(users).where(eq(users.id, userId)).limit(1)
      if (user[0].isAdmin == false) {
        throw new Error("No tienes permisos para editar este producto")
      }

      if (applyToAll) {
        await tx
          .update(products)
          .set({
            price: operationQueries[operationType][unitType]
          })
          .returning({
            updatedId: products.id
          })

        await tx.insert(history).values({
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
          await tx
            .update(products)
            .set({
              price: operationQueries[operationType][unitType]
            })
            .where(eq(products.id, column))
            .returning({
              updatedId: products.id
            })
        })

        await tx.insert(history).values({
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

    })

    return res

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