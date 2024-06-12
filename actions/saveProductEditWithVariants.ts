"use server"

import { db, products } from "@/schema"
import { eq } from "drizzle-orm"

export const saveProductEditWithVariants = async (barcode: string, data: any): Promise<any> => {
  "use server"
  try {
    const product = await db.select().from(products).where(eq(products.barcode, barcode))
    if (product.length === 0) throw new Error("Producto no encontrado")
    await db.update(products).set({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      barcode: data.barcode
    }).where(eq(products.barcode, barcode))

    data.variants.forEach(async (variant: any) => {
      await db.update(products).set({
        name: variant.name,
        description: variant.description,
        price: variant.price,
        stock: variant.stock,
        barcode: variant.barcode
      }).where(eq(products.barcode, variant.barcode))
    })

    return {
      data: product[0],
      error: null,
      message: "Producto editado correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al editar el producto"
      }
    }

    return {
      data: null,
      error: "Error al editar el producto",
      message: "Error al editar el producto"
    }
  }
}