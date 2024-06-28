"use server"

import { GeneralResponse } from "@/lib/types"
import { ProviderType, db, history, providers } from "@/schema"

export const createNewProvider = async (data: ProviderType, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const providerFromDB = await db.insert(providers).values({
      name: data.name,
      lastName: data.lastName,
      companyName: data.companyName,
      address: data.address,
      phone: data.phone,
      email: data.email,
      cuitCuil: data.cuitCuil,
      active : true
    }).returning({
      insertedId: providers.id
    })

    if (providerFromDB.length === 0) throw new Error("Error al crear el proveedor")

    await db.insert(history).values({
      userId: userId,
      actionType: "create-provider",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    return {
      data: providerFromDB[0],
      error: null,
      message: "Proveedor creado correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear el proveedor"
      }
    }
    return {
      data: null,
      error: "Error al crear el proveedor",
      message: "Error al crear el proveedor"
    }
  }
}