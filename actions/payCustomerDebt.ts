"use server"

import { db, customers, cashRegister, history, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { revalidatePath } from "next/cache"


export const payCustomerDebt = async (customerId: string, payAll: boolean, manualAmount: number, userId: string): Promise<GeneralResponse> => {
  "use server"

  try {
    const customer = await db.select().from(customers).where(eq(customers.id, customerId))

    if (customer.length === 0) throw new Error("Cliente no encontrado")

    const cashRegisterFromDB = await db.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

    if (cashRegisterFromDB.length === 0) throw new Error("No tienes ninguna caja abierta")

    if (payAll) {

      const negativeToPositive = customer[0].currentAmount * -1

      /* await db.update(cashRegister).set({
        currentAmount: sql`${cashRegister.currentAmount} + ${negativeToPositive}`
      }) */

      await db.update(customers).set({
        currentAmount: 0,
      }).where(eq(customers.id, customerId))
    } else {

      /* await db.update(cashRegister).set({
        currentAmount: sql`${cashRegister.currentAmount} + ${manualAmount}`
      }) */

      await db.update(customers).set({
        currentAmount: sql`${customers.currentAmount} + ${manualAmount}`
      }).where(eq(customers.id, customerId))
    }

    const generalBalanceFromDb = await db.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

    if (payAll) {
      await db.insert(generalBalance).values({
        incomingAmount: customer[0].currentAmount,
        balance: String(Number(generalBalanceFromDb[0].balance) + customer[0].currentAmount),
        balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
        operationType: "refund-customer",
        detail: "Saldo completo de deuda de " + customer[0].name + ", " + customer[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
        isDebt: false,
        userId: userId
      })
    } else {
      await db.insert(generalBalance).values({
        incomingAmount: `${manualAmount}`,
        balance: String(Number(generalBalanceFromDb[0].balance) + customer[0].currentAmount),
        balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
        operationType: "refund-customer",
        detail: "Saldo parcial de deuda de " + customer[0].name + ", " + customer[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
        isDebt: false,
        userId: userId
      })
    }

    await db.insert(history).values({
      userId: userId,
      actionType: "Pago de la deuda",
      products: [],
      orderId: null,
      customerId: customer[0].id,
      ip: null,
      userAgent: null,
    })

    revalidatePath("/customers")

    return {
      data: null,
      error: null,
      message: "Debe haber sido pagado correctamente"
    }



  } catch (e) {
    return {
      data: null,
      error: "Error al pagar la deuda",
      message: "Error al pagar la deuda"
    }
  }

}