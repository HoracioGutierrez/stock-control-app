"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { asc, eq } from "drizzle-orm"

export const getAllProducts = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {
    let productsFromDb: any
    if (inactive) {
      productsFromDb = await db.select().from(products).orderBy(asc(products.name))
    } else {
      productsFromDb = await db.select().from(products).where(eq(products.active, true)).orderBy(asc(products.name))
    }

    return {
      data: productsFromDb,
      error: null,
      message: "Productos encontrados"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: error.message
      }
    }


    return {
      data: [],
      error: "Error al obtener los productos",
      message: "Error al obtener los productos"
    }
  }
}