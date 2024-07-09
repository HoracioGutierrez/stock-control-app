"use server"
import { GeneralResponse } from "@/lib/types"
import { db, customers } from "@/schema"
import { asc, eq } from "drizzle-orm"

export const getAllCustomers = async (inactive = false): Promise<GeneralResponse> => {
    "use server"
    try {
        let customersFromDb: any
        if (inactive) {
            customersFromDb = await db.select().from(customers).orderBy(asc(customers.name))
        } else {
            customersFromDb = await db.select().from(customers).where(eq(customers.active, true)).orderBy(asc(customers.name))
        }

        return {
            data: customersFromDb,
            error: null,
            message: "Clientes encontrados"
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: [],
                error: error.message,
                message: error.message
            }
        }

        return {
            data: [],
            error: "Error al obtener los clientes",
            message: "Error al obtener los clientes"
        }
    }
}