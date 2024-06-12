"use server"
import { GeneralResponse } from "@/lib/types";
import { db, products } from "@/schema";
import { eq } from "drizzle-orm";

export const editProductById = async (productId: string, data: any): Promise<GeneralResponse> => {
  "use server"
  console.log(productId)
  try {
    const product = await db.update(products).set(data).where(eq(products.id, productId)).returning({
      insertedId: products.id
    })
    if (product.length === 0) throw new Error("Producto no encontrado")
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