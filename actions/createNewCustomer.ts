"use server"

import { GeneralResponse } from "@/lib/types"
import { CustomerType, db, customers, history } from "@/schema"
import { revalidatePath } from "next/cache"

export const createNewCustomer = async (data: CustomerType, userId: string): Promise<GeneralResponse> => {
    "use server"
    try {
        const customer = await db.insert(customers).values({
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            legalName: data.legalName,
            cuitCuil: data.cuitCuil,
            active: true
        }).returning({
            insertedId: customers.id
        })

        if (customer.length === 0) throw new Error("Error al crear el cliente")

        await db.insert(history).values({
            userId: userId,
            actionType: "create-customer",
            products: [],
            orderId: null,
            customerId: customer[0].insertedId,
            ip: null,
            userAgent: null,
        }).returning({
            insertedId: history.id
        })

        revalidatePath("/customers")
        
        return {
            data: customer[0],
            error: null,
            message: "Cliente creado correctamente"
        }

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: "Error al crear el cliente"
            }
        }
        return {
            data: null,
            error: "Error al crear el cliente",
            message: "Error al crear el cliente"
        }
    }

}

