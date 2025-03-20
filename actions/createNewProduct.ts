"use server"
import { GeneralResponse, ProductInputValues } from "@/lib/types";
import { ProductType, db, history, products, users } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createNewProduct = async (userId: string, data: ProductType, variants: any[] | undefined): Promise<GeneralResponse> => {
  "use server"
  try {
    const res = await db.transaction(async (tx) => {

      const user = await tx.select().from(users).where(eq(users.id, userId)).limit(1)
      if (user[0].isAdmin == false) {
        throw new Error("No tienes permisos para crear este producto")
      }

      const product = await tx.insert(products).values({
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        barcode: data.barcode,
        stock: data.stock,
        userId: userId,
        isVariant: false,
        active: true,
        hasVariants: variants && variants.length > 0 ? true : false
      }).returning({
        insertedId: products.id
      })

      if (variants) {
        for (const variant of variants) {
          const productVariant = await tx.insert(products).values({
            name: variant.name,
            description: data.description,
            price: variant.price,
            quantity: variant.quantity,
            barcode: variant.barcode,
            stock: variant.stock,
            userId: userId,
            productId: product[0].insertedId,
            isVariant: true,
            active: true,
            hasVariants: false
          }).returning({
            insertedId: products.id
          })

          await tx.insert(history).values({
            userId: userId,
            actionType: "create-product-variant",
            products: [productVariant[0].insertedId],
            orderId: null,
            customerId: null,
            ip: null,
            userAgent: null,
          })
        }

      }

      if (product.length === 0) {
        tx.rollback()
        throw new Error("Error al crear el producto")
      }

      await tx.insert(history).values({
        userId: userId,
        actionType: "create-product",
        products: [product[0].insertedId],
        orderId: null,
        customerId: null,
        ip: null,
        userAgent: null,
      })


      revalidatePath("/products")
      return {
        data: product[0],
        error: null,
        message: "Producto creado correctamente"
      }

    })

    return res

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: "Error al crear el producto"
      }
    }
    return {
      data: null,
      error: "Error al crear el producto",
      message: "Error al crear el producto"
    }
  }
}