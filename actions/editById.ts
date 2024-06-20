"use server"

import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById } from "@/lib/queryConfig"
import { Entity } from "@/lib/types"
import { eq } from "drizzle-orm"
import { db } from "@/schema"


export const editById = async (entityType: string, entityId: string, data: any): Promise<GeneralResponse> => {
    "use server"
    try {
        const entitySchema = entitiesPropsById[entityType as keyof Entity]
        const updatedEntity = await db.update(entitySchema).set(data).where(eq(entitySchema.id, entityId)).returning({
            insertedId: entitySchema.id
        })
        if (updatedEntity.length === 0) throw new Error(`${entityType.slice(1)} no encontrado`)

        return {
            data: updatedEntity[0],
            error: null,
            message: `${entityType.slice(1)} actualizado correctamente`
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: `Error al editar el ${entityType.slice(1)}`
            }
        }
        return {
            data: null,
            error: `Error al editar el ${entityType.slice(1)}`,
            message: `Error al editar el ${entityType.slice(1)}`
        }
    }
}
