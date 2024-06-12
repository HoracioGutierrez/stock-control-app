"use client"
import { Input } from "./ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { editProductSchema } from "@/lib/schemas"
import { SubmitHandler, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { EditProductInputValues, ProductInputValues } from "@/lib/types"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useState } from "react"
import { Button } from "./ui/button"
import { Loader } from "lucide-react"
import { toast } from "./ui/use-toast"
import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { editProductById } from "@/actions/editProductById"
import { useProductDialogStore } from "@/stores/productDialogStore"

type EditProductFormProps = {
  barcode: string
}

function EditProductForm({ barcode }: EditProductFormProps) {

  const [error, setError] = useState<string | null>(null)
  const [mainName, setMainName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [productId, setProductId] = useState<string>("")
  const { close } = useProductDialogStore((state: any) => state)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditProductInputValues>({
    defaultValues: async () => {
      setLoading(true)
      const { data, error } = await getProductByBarcode(barcode)
      setLoading(false)
      if (error) {
        return {
          name: "",
          description: "",
          price: 0,
          barcode: "",
          stock: 0,
        }
      }
      setProductId(data.id as string)
      return {
        name: data.name as string,
        description: data.description as string,
        price: data.price as number,
        stock: data.stock as number,
        barcode: data.barcode as string,
      }
    },
    resolver: yupResolver(editProductSchema),
  })

  const onSubmit: SubmitHandler<ProductInputValues> = (data: ProductInputValues) => {
    setLoading(true)
    editProductById(productId, data)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto editado correctamente",
          description: "El producto se ha editado correctamente de la base de datos",
        })
        close()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message)
        }
        setError("Error al editar el producto, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al editar el producto",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="new-product-form">
      <div className="self-stretch">
        <Card className="bg-accent h-full">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
            <CardDescription>Estos detalles son obligatorios para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input type="text" placeholder="Producto" {...register("name", { disabled: loading })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea placeholder="Descripción" {...register("description", { disabled: loading })} />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Precio</CardTitle>
            <CardDescription>Estos datos son opcionales para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input type="number" placeholder="Precio" {...register("price", { disabled: loading })} />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input type="number" placeholder="Stock" {...register("stock", { disabled: loading })} />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="barcode">Código de barras</Label>
              <Input type="text" placeholder="Código de barras" {...register("barcode", { disabled: loading })} />
              {errors.barcode && <p className="text-red-500">{errors.barcode.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-full grid gap-4">
        <Button form="new-product-form" className="flex items-center gap-2 mx-auto mt-8" disabled={loading}>
          {loading && <Loader className="animate-spin" />}
          <span>Guardar producto</span>
        </Button>
      </div>
    </form>
  )
}
export default EditProductForm