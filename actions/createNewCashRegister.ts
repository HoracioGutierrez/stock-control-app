"use server"
import { GeneralResponse } from "@/lib/types"
import { CashRegisterType, db, cashRegister, history } from "@/schema"
import { revalidatePath } from "next/cache"

export const createNewCashRegister = async (data: CashRegisterType, userId: string): Promise<GeneralResponse> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const cashRegisterFromDB = await tx.insert(cashRegister).values({
        label: data.label,
        currentAmount: data.currentAmount,
        totalAmount: data.totalAmount,
        userId: userId,
        active: true,
      }).returning({
        insertedId: cashRegister.id
      })

      if (cashRegisterFromDB.length === 0) {
        tx.rollback()
        throw new Error("Error al crear la caja")
      }

      await tx.insert(history).values({
        userId: userId,
        actionType: "create-cash-register",
        products: [],
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })

      revalidatePath("/cashRegisters")

      return {
        data: cashRegisterFromDB[0],
        error: null,
        message: "Caja creada correctamente"
      }

    })

    return res

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