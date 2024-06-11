"use server"
import { GeneralResponse, ProductInputValues } from "@/lib/types";
import { ProductType, db, products } from "@/schema";

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
      isVariant: false
    }).returning({
      insertedId: products.id
    })

    if (variants) {
      console.log(product)
      for (const variant of variants) {
        await db.insert(products).values({
          name: variant.name,
          description: data.description,
          price: variant.price,
          quantity: variant.quantity,
          barcode: variant.barcode,
          stock: variant.stock,
          userId: userId,
          productId: product[0].insertedId,
          isVariant: true
        })
      }
    }

    if (product.length === 0) throw new Error("Error al crear el producto")

    return {
      data: product[0],
      error: null,
      message: "Producto creado correctamente"
    }

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