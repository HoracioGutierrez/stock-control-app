"use server"

import { db, customers, cashRegister, history, generalBalance } from "@/schema"
import { desc, eq, sql } from "drizzle-orm"
import { GeneralResponse } from "@/lib/types"
import { entitiesPropsById, entityName } from "@/lib/queryConfig"
import { revalidatePath } from "next/cache"


export const payCustomerDebt = async (customerId: string, payAll: boolean, manualAmount: number, userId: string): Promise<GeneralResponse> => {
  "use server"

  try {

    const res = await db.transaction(async (tx) => {

      const customer = await tx.select().from(customers).where(eq(customers.id, customerId))

      if (customer.length === 0) {
        tx.rollback()
        throw new Error("Cliente no encontrado")
      }

      const cashRegisterFromDB = await tx.select().from(cashRegister).where(eq(cashRegister.openedById, userId))

      if (cashRegisterFromDB.length === 0) {
        tx.rollback()
        throw new Error("No tienes ninguna caja abierta")
      }

      if (payAll) {

        const negativeToPositive = customer[0].currentAmount * -1

        await tx.update(cashRegister).set({
          currentAmount: sql`${cashRegister.currentAmount} + ${negativeToPositive}`,
          totalAmount: sql`${cashRegister.totalAmount} + ${negativeToPositive}`,
        })

        await tx.update(customers).set({
          currentAmount: 0,
        }).where(eq(customers.id, customerId))

      } else {

        await tx.update(cashRegister).set({
          currentAmount: sql`${cashRegister.currentAmount} + ${manualAmount}`,
          totalAmount: sql`${cashRegister.totalAmount} + ${manualAmount}`,
        })

        await tx.update(customers).set({
          currentAmount: sql`${customers.currentAmount} + ${manualAmount}`
        }).where(eq(customers.id, customerId))
      }

      const generalBalanceFromDb = await tx.select().from(generalBalance).limit(1).orderBy(desc(generalBalance.createdAt))

      if (payAll) {
        const negativeToPositive = customer[0].currentAmount * -1

        await tx.insert(generalBalance).values({
          incomingAmount: `${negativeToPositive}`,
          balance: String(Number(generalBalanceFromDb[0].balance) + negativeToPositive),
          balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
          operationType: "pay-customer-debt-all",
          detail: "Saldo completo de deuda de " + customer[0].name + ", " + customer[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
          isDebt: false,
          userId: userId
        })
      } else {
        await tx.insert(generalBalance).values({
          incomingAmount: `${manualAmount}`,
          balance: String(Number(generalBalanceFromDb[0].balance) + manualAmount),
          balanceWithDebt: generalBalanceFromDb[0].balanceWithDebt,
          operationType: "pay-customer-debt-manual",
          detail: "Saldo parcial de deuda de " + customer[0].name + ", " + customer[0].lastName + " de la caja " + cashRegisterFromDB[0].label,
          isDebt: false,
          userId: userId
        })
      }

      await tx.insert(history).values({
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

    })

    return res

  } catch (e) {
    return {
      data: null,
      error: "Error al pagar la deuda",
      message: "Error al pagar la deuda"
    }
  }

}