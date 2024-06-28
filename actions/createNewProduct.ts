"use server"
import { GeneralResponse, ProductInputValues } from "@/lib/types";
import { ProductType, db, history, products } from "@/schema";
import { revalidatePath } from "next/cache";

export const createNewProduct = async (userId: string, data: ProductType, variants: any[] | undefined): Promise<GeneralResponse> => {
  "use server"
  try {
    const product = await db.insert(products).values({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      barcode: data.barcode,
      stock: data.stock,
      userId: userId,
      isVariant: false,
      active: true
    }).returning({
      insertedId: products.id
    })

    if (variants) {
      for (const variant of variants) {
        const productVariant = await db.insert(products).values({
          name: variant.name,
          description: data.description,
          price: variant.price,
          quantity: variant.quantity,
          barcode: variant.barcode,
          stock: variant.stock,
          userId: userId,
          productId: product[0].insertedId,
          isVariant: true,
          active: true
        }).returning({
          insertedId: products.id
        })

        await db.insert(history).values({
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

    if (product.length === 0) throw new Error("Error al crear el producto")

    await db.insert(history).values({
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

  } catch (error) {

    console.log(error)
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