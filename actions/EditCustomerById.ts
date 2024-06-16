"use server"

import { GeneralResponse } from "@/lib/types"
import { db, customers } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const editCustomerById = async (customerId: string, data: any): Promise<GeneralResponse> => {
    "use server"
    try {
        const customer = await db.update(customers).set(data).where(eq(customers.id, customerId)).returning({
            insertedId: customers.id
        })
        if (customer.length === 0) throw new Error("Cliente no encontrado")

        revalidatePath("/customers")
        return {
            data: customer[0],
            error: null,
            message: "Cliente editado correctamente"
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: "Error al editar el cliente"
            }
        }

        return {
            data: null,
            error: "Error al editar el cliente",
            message: "Error al editar el cliente"
        }
    }
}