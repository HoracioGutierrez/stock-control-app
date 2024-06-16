"use server"

import { GeneralResponse } from "@/lib/types"
import { db, products, customers } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const editById = async (entityType: string, entityId: string, data: any): Promise<GeneralResponse> => {
    "use server"
    try {
        const entity = entityType === 'product' ? products : customers;
        const updatedEntity = await db.update(entity).set(data).where(eq(entity.id, entityId)).returning({
            insertedId: entity.id
        })
        if (updatedEntity.length === 0) throw new Error(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} no encontrado`)

        revalidatePath(`/${entityType}s`)
        return {
            data: updatedEntity[0],
            error: null,
            message: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} editado correctamente`
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: `Error al editar el ${entityType}`
            }
        }

        return {
            data: null,
            error: `Error al editar el ${entityType}`,
            message: `Error al editar el ${entityType}`
        }
    }
}