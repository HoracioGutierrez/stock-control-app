import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { asc } from "drizzle-orm"

export const getAllProducts = async (): Promise<GeneralResponse> => {
  try {
    const productsFromDb = await db.select().from(products).orderBy(asc(products.name))
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