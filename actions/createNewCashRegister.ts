"use server"
import { GeneralResponse } from "@/lib/types"
import { CashRegisterType, db, cashRegister, history } from "@/schema"

export const createNewCashRegister = async (data: CashRegisterType, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {
    const cashRegisterFromDB = await db.insert(cashRegister).values({
      label: data.label,
      currentAmount: data.currentAmount,
      totalAmount: data.totalAmount,
      userId: userId,
      active: true,
    }).returning({
      insertedId: cashRegister.id
    })

    if (cashRegisterFromDB.length === 0) throw new Error("Error al crear la caja")

    await db.insert(history).values({
      userId: userId,
      actionType: "create-cash-register",
      products: [],
      orderId: null,
      customerId: null,
      ip: null,
      userAgent: null,
    })

    return {
      data: cashRegisterFromDB[0],
      error: null,
      message: "Caja creada correctamente"
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear la caja"
      }
    }
    return {
      data: null,
      error: "Error al crear la caja",
      message: "Error al crear la caja"
    }
  }

}