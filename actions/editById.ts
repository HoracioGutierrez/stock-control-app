"use server"

import { db, products, users } from "@/schema"
import { eq } from "drizzle-orm"
import { Entity, EntityName } from "@/lib/types"
import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { revalidatePath } from "next/cache"


export const editById = async (entityType: string, entityId: string, data: any, userId: string): Promise<GeneralResponse> => {
    console.log(data)
    "use server"
    const entityNameResolve = entityName[entityType as keyof EntityName]
    try {

        const res = await db.transaction(async (tx) => {

            const entitySchema = entitiesPropsById[entityType as keyof Entity]
            const entityHistory = entitiesPropsById["history"]


            if (entityType == "product") {
                const user = await tx.select().from(users).where(eq(users.id, userId)).limit(1)

                if (user[0].isAdmin == false) {
                    throw new Error("No tienes permisos para editar este producto")
                }
            }

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
        console.log(error)
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
