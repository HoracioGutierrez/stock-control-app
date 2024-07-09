"use server"
import { GeneralResponse } from "@/lib/types"
import { db, products } from "@/schema"
import { sql } from "drizzle-orm"

export const getProductByName = async (productName: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const productsFromDB = await db.execute(sql`
      SELECT * 
      FROM ${products} 
      WHERE lower(${products.name}) 
      LIKE '%${sql.raw(productName.toLowerCase())}%' 
      OR lower(${products.description}) 
      LIKE '%${sql.raw(productName.toLowerCase())}%'`)

    if (productsFromDB.length === 0) throw new Error("Producto no encontrado")
    return {
      data: productsFromDB,
      error: null,
      message: "Producto encontrado"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: [],
        error: error.message,
        message: error.message
      }
    }

    return {
      data: [],
      error: "Error al obtener el producto",
      message: "Error al obtener el producto"
    }
  }
}