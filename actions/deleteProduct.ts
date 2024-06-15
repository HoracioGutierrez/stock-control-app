"use server"
import { GeneralResponse } from "@/lib/types";
import { db, history, products } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (barcode: string, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const product = await db.select().from(products).where(eq(products.barcode, barcode))
    if (product.length === 0) throw new Error("Producto no encontrado")
    await db.update(products).set({ active: false }).where(eq(products.barcode, barcode))

    await db.insert(history).values({
      userId: userId,
      actionType: "delete-product",
      products: [ product[0].id ],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/products")
    return {
      data: product[0],
      error: null,
      message: "Producto eliminado correctamente"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al eliminar el producto"
      }
    }

    return {
      data: null,
      error: "Error al eliminar el producto",
      message: "Error al eliminar el producto"
    }
  }
}