"use server"

import { GeneralResponse } from "@/lib/types"
import { ClientType, db, clients } from "@/schema"

export const createNewClient = async (data: ClientType): Promise<GeneralResponse> => {
    "use server"
    try {
        const client = await db.insert(clients).values({
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            legalName: data.legalName,
            cuitCuil: data.cuitCuil,
        }).returning({
            insertedId: clients.id
        })

        if (client.length === 0) throw new Error("Error al crear el cliente")

        return {
            data: client[0],
            error: null,
            message: "Cliente creado correctamente"
        }

    } catch (error) {
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

