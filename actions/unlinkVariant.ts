"use server"

import { db, history, products } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { GeneralResponse } from "@/lib/types"

export const unlinkVariant = async (barcode: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const product = await tx.select().from(products).where(eq(products.barcode, barcode))

      if (product.length === 0) {
        tx.rollback()
        throw new Error("Producto no encontrado")
      }

      await tx.update(products).set({ productId: null, isVariant: false }).where(eq(products.id, product[0].id))

      const hasVariants = await tx.select().from(products).where(eq(products.productId, product[0].id))

      if (hasVariants.length === 0) {
        await tx.update(products).set({ hasVariants: false }).where(eq(products.id, product[0].productId))
      }

      await tx.insert(history).values({
        userId: userId,
        actionType: "unlink-variant",
        products: [product[0].id],
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })

      revalidatePath("/products")

      return {
        data: null,
        error: null,
        message: "Variante eliminada correctamente"
      }
    })

    return res
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al eliminar la variante"
      }
    }
    return {
      data: null,
      error: "Error al eliminar la variante",
      message: "Error al eliminar la variante"
    }
  }
}