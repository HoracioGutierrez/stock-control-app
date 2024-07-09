"use server"

import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { Entity, EntityName, GeneralResponse } from "@/lib/types"
import { db } from "@/schema"
import { eq } from "drizzle-orm"

export const getById = async (entityType: string, entityId?: string, barcode?: string): Promise<GeneralResponse> => {
  "use server"
  const entityNameResolve = entityName[entityType as keyof EntityName]
  try {
    const idResolve = barcode === undefined ? entityId : barcode
    const entitySchema = entitiesPropsById[entityType as keyof Entity]
    let response
    if (entityType === "product") {
      response = await db.select().from(entitySchema).where(eq(entitySchema.barcode, idResolve))
    } else {
      response = await db.select().from(entitySchema).where(eq(entitySchema.id, idResolve))
    }

    if (response.length === 0) throw new Error(`${entityNameResolve} no encontrado`)

    return {
      data: response[0],
      error: null,
      message: `${entityNameResolve} encontrado`,
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: `Error al obtener el ${entityNameResolve}`
      }
    }
    return {
      data: null,
      error: `Error al obtener el ${entityNameResolve}`,
      message: `Error al obtener el ${entityNameResolve}`
    }
  }
}