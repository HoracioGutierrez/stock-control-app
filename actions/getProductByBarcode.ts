"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { and, eq } from "drizzle-orm"

export const getProductByBarcode = async (barcode: string): Promise<GeneralResponse> => {
  "use server"

  try {

    const product = await db.select().from(products).where(and(eq(products.barcode, barcode), eq(products.active, true)))

    if (product.length === 0) throw new Error("Producto no encontrado")

    return {
      data: product[0],
      error: null,
      message: "Producto encontrado"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener el producto"
      }
    }

    return {
      data: null,
      error: "Error al obtener el producto",
      message: "Error al obtener el producto"
    }
  }
}