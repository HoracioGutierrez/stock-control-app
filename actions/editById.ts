"use server"

import { db, products } from "@/schema"
import { eq } from "drizzle-orm"
import { Entity, EntityName } from "@/lib/types"
import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { revalidatePath } from "next/cache"


export const editById = async (entityType: string, entityId: string, data: any, userId: string): Promise<GeneralResponse> => {
    "use server"
    const entityNameResolve = entityName[entityType as keyof EntityName]
    try {

        const res = await db.transaction(async (tx) => {

            const entitySchema = entitiesPropsById[entityType as keyof Entity]
            const entityHistory = entitiesPropsById["history"]


            const response = await tx.update(entitySchema).set(data).where(eq(entitySchema.id, entityId)).returning({
                insertedId: entitySchema.id
            })
            if (response.length === 0) {
                tx.rollback()
                throw new Error(`${entityNameResolve} no encontrado`)
            }


            if (entityType != "cashRegister") {
                await tx.insert(entityHistory).values({
                    userId: userId,
                    actionType: `${entityNameResolve} editado`,
                    products: [data.lastName ? data.lastName + " " + data.name : ""],
                    orderId: null,
                    customerId: null,
                    ip: null,
                    userAgent: null,
                })
            }


            revalidatePath(`/${entityType}s`)
            return {
                data: response[0],
                error: null,
                message: `${entityNameResolve} actualizado correctamente`
            }

        })

        return res
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: `Error al editar el ${entityNameResolve}`
            }
        }
        return {
            data: null,
            error: `Error al editar el ${entityNameResolve}`,
            message: `Error al editar el ${entityNameResolve}`
        }
    }
}
