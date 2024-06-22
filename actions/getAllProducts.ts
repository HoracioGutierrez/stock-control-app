"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { asc, eq } from "drizzle-orm"

export const getAllProducts = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {
    //const productsFromDb = await db.select().from(products).orderBy(asc(products.name))
    let productsFromDb: any
    if (inactive) {
      productsFromDb = await db.select().from(products).orderBy(asc(products.name))
    } else {
      productsFromDb = await db.select().from(products).where(eq(products.active, true)).orderBy(asc(products.name))
    }

    return {
      data: productsFromDb,
      error: null,
      message: "Products found"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error getting products"
      }
    }


    return {
      data: null,
      error: "Error getting products",
      message: "Error getting products"
    }
  }
}