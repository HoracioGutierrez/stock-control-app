"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const reactivateProduct = async (barcode: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const product = await db.select().from(products).where(eq(products.barcode, barcode))
    if (product.length === 0) throw new Error("Producto no encontrado")
    await db.update(products).set({ active: true }).where(eq(products.barcode, barcode))
    revalidatePath("/products")
    return {
      data: product[0],
      error: null,
      message: "Producto reactivado correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al reactivar el producto"
      }
    } else {
      return {
        data: null,
        error: "Error al reactivar el producto",
        message: "Error al reactivar el producto"
      }
    }

  }
}