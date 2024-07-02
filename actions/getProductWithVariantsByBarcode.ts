"use server"

import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { eq } from "drizzle-orm"

export const getProductWithVariantsByBarcode = async (barcode: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const product = await db.select().from(products).where(eq(products.barcode, barcode))
    if (product.length === 0) throw new Error("Producto no encontrado")
    const variants = await db.select().from(products).where(eq(products.productId, product[0].id))

    const data = {
      name: product[0].name as string,
      description: product[0].description as string,
      price: product[0].price as number,
      stock: product[0].stock as number,
      barcode: product[0].barcode as string,
      variants: variants as any[]
    }

    return {
      data,
      error: null,
      message: "Producto encontrado"
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
      error : "Error al obtener el producto",
      message: "Error al obtener el producto"
    }
  }
}