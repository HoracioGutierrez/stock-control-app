"use server"
import { GeneralResponse } from "@/lib/types";
import { db, history, products } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const editProductById = async (productId: string, data: any, userId: string): Promise<GeneralResponse> => {
  "use server"
  console.log(productId)
  try {
    const product = await db.update(products).set(data).where(eq(products.id, productId)).returning({
      insertedId: products.id
    })
    if (product.length === 0) throw new Error("Producto no encontrado")

    await db.insert(history).values({
      userId: userId,
      actionType: "edit-product",
      products: [product[0].insertedId],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/products")
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