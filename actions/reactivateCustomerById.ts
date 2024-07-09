"use server"

import { GeneralResponse } from "@/lib/types"
import { db, customers } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const reactivateCustomerById = async (id: string): Promise<GeneralResponse> => {
    "use server"
    try {
        const res = await db.transaction(async (tx) => {

            const customer = await tx.select().from(customers).where(eq(customers.id, id))

            if (customer.length === 0) {
                tx.rollback()
                throw new Error("Cliente no encontrado")
            }

            await tx.update(customers).set({ active: true }).where(eq(customers.id, id))

            revalidatePath("/customers")

            return {
                data: customer[0],
                error: null,
                message: "Cliente reactivado correctamente"
            }
        })

        return res
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: "Error al reactivar el cliente"
            }
        } else {
            return {
                data: null,
                error: "Error al reactivar el cliente",
                message: "Error al reactivar el cliente"
            }
        }
    }
}