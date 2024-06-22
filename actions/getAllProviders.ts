"use server"
import { GeneralResponse } from "@/lib/types"
import { db, providers } from "@/schema"
import { eq } from "drizzle-orm"

export const getAllProviders = async (inactive = false): Promise<GeneralResponse> => {
  "use server"
  try {
    //const providersFromDb = await db.select().from(providers).orderBy(providers.name)

    let providersFromDb: any
    if (inactive) {
      providersFromDb = await db.select().from(providers).orderBy(providers.name)
    } else {
      providersFromDb = await db.select().from(providers).where(eq(providers.active, true)).orderBy(providers.name)
    }

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