"use server"
import { GeneralResponse } from "@/lib/types"
import { db, providers } from "@/schema"

export const getAllProviders = async (): Promise<GeneralResponse> => {
  "use server"
  try {
    const providersFromDb = await db.select().from(providers).orderBy(providers.name)
    return {
      data: providersFromDb,
      error: null,
      message: "Proveedores encontrados"
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al obtener los proveedores"
      }
    }


    return {
      data: null,
      error: "Error al obtener los proveedores",
      message: "Error al obtener los proveedores"
    }
  }
}