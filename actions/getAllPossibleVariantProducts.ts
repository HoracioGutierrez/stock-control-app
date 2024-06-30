"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const getAllPossibleVariantProducts = async (): Promise<GeneralResponse> => {
  "use server"
  try {
    const productsFromDB = await db.select().from(products).where(eq(products.isVariant, false))
    if (productsFromDB.length === 0) throw new Error("No tienes productos")
    return {
      data: productsFromDB,
      error: null,
      message: "Productos encontrados"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener los productos"
      }
    }
    return {
      data: null,
      error: "Error al obtener los productos",
      message: "Error al obtener los productos"
    }
  }
}