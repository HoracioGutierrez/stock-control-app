"use server"

import { GeneralResponse } from "@/lib/types"
import { db, customers, products } from "@/schema"
import { eq } from "drizzle-orm"

export const getById = async (entityType: string, id: string | undefined, barcode: string | undefined): Promise<GeneralResponse> => {
  "use server"
  try {
    const entity = entityType === 'product' ? products : customers;
    const entityId = barcode === undefined ? "id" : "barcode"
    const entityData = barcode === undefined ? id : barcode
    const data = await db.select().from(entity).where(eq(entity[entityId], entityData))

    if (data.length === 0) throw new Error(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} no encontrado`)
    return {
      data: data[0],
      error: null,
      message: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} encontrado`
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: `Error al obtener el ${entityType}`
      }
    }
    return {
      data: null,
      error: `Error al obtener el ${entityType}`,
      message: `Error al obtener el ${entityType}`
    }
  }
}