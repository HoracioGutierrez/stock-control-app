"use server"

import { db, history, products } from "@/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const saveProductEditWithVariants = async (barcode: string, data: any, userId: string): Promise<any> => {
  "use server"
  try {

    const res = await db.transaction(async (tx) => {

      const product = await tx.select().from(products).where(eq(products.barcode, barcode))

      if (product.length === 0) {
        tx.rollback()
        throw new Error("Producto no encontrado")
      }

      await tx.update(products).set({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        barcode: data.barcode
      }).where(eq(products.barcode, barcode))

      await tx.insert(history).values({
        userId: userId,
        actionType: "edit-product",
        products: [product[0].id],
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })

      data.variants.forEach(async (variant: any) => {

        const isVariant = await tx.select().from(products).where(eq(products.barcode, variant.barcode))

        if (isVariant.length > 0) {

          const productVariant = await tx.update(products).set({
            name: variant.name,
            description: variant.description,
            price: variant.price,
            stock: variant.stock,
            barcode: variant.barcode
          }).where(eq(products.barcode, variant.barcode)).returning({
            insertedId: products.id
          })

          await tx.insert(history).values({
            userId: userId,
            actionType: "edit-product-variant",
            products: [productVariant[0].insertedId],
            orderId: null,
            customerId: null,
            ip: null,
            userAgent: null,
          })

        } else {

          const productVariant = await tx.insert(products).values({
            name: variant.name,
            description: variant.description,
            price: variant.price,
            stock: variant.stock,
            barcode: variant.barcode,
            userId: userId,
            isVariant: true,
            productId: product[0].id
          }).returning({
            insertedId: products.id
          })

          await tx.insert(history).values({
            userId: userId,
            actionType: "edit-product-variant",
            products: [productVariant[0].insertedId],
            orderId: null,
            customerId: null,
            ip: null,
            userAgent: null,
          })
        }
      })

      revalidatePath("/products")
      return {
        data: product[0],
        error: null,
        message: "Producto editado correctamente"
      }

    })

    return res
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al editar el producto"
      }
    }

    return {
      data: null,
      error: "Error al editar el producto",
      message: "Error al editar el producto"
    }
  }
}