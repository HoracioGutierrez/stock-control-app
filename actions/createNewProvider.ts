"use server"

import { GeneralResponse } from "@/lib/types"
import { ProviderType, db, history, providers } from "@/schema"

export const createNewProvider = async (data: ProviderType, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const providerFromDB = await tx.insert(providers).values({
        name: data.name,
        lastName: data.lastName,
        companyName: data.companyName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        cuitCuil: data.cuitCuil,
        active: true
      }).returning({
        insertedId: providers.id
      })

      if (providerFromDB.length === 0) {
        tx.rollback()
        throw new Error("Error al crear el proveedor")
      }

      await tx.insert(history).values({
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
    })

    return res
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