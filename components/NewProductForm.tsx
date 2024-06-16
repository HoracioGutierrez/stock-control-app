"use client"
import { Input } from "./ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "@/lib/schemas"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { NewProductFormProps, ProductInputValues } from "@/lib/types"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { createNewProduct } from "@/actions/createNewProduct"
import { useState } from "react"
import { useNewProductStore } from "@/stores/newProductStore"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Barcode, Check, Loader, PlusCircle } from "lucide-react"
import ProductVariantForm from "./ProductVariantForm"
import { toast } from "./ui/use-toast"

function NewProductForm({ userId }: NewProductFormProps) {

  const [error, setError] = useState<string | null>(null)
  const [mainName, setMainName] = useState<string>("")
  const { setIsLoading, isLoading } = useNewProductStore((state: any) => ({ isLoading: state.isLoading, setIsLoading: state.setIsLoading }))
  const { control, register, handleSubmit, formState: { errors }, reset, getValues } = useForm<ProductInputValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      barcode: "",
      stock: 0,
      variants: []
    },
    resolver: yupResolver(productSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  })

  const onSubmit: SubmitHandler<ProductInputValues> = (data: ProductInputValues) => {
    setIsLoading(true)
    createNewProduct(userId, {
      barcode: data.barcode,
      description: data.description,
      name: data.name,
      price: `${data.price}`,
      stock: `${data.stock}`,
      userId: userId
    }, getValues("variants"))
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto creado correctamente",
          description: "El producto se ha creado correctamente, puedes verlo en la sección de productos"
        })
        reset()
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message)
        }
        setError("Error al crear el producto, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al crear el producto",
          description: error.message
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleMainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setMainName(newName)
  }

  const handleAddVariant = () => {
    append({ name: getValues("name"), price: getValues("price"), stock: 0, barcode: "" })
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
              <Input type="text" disabled={isLoading} placeholder="Producto" {...register("name", { onChange: handleMainNameChange })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea disabled={isLoading} placeholder="Descripción" {...register("description")} />
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
              <Input type="number" placeholder="Precio" {...register("price")} disabled={isLoading} />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input type="number" placeholder="Stock" {...register("stock")} disabled={isLoading} />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="barcode">Código de barras</Label>
              <Input type="text" placeholder="Código de barras" {...register("barcode")} disabled={isLoading} />
              {errors.barcode && <p className="text-red-500">{errors.barcode.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-full">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Variantes</CardTitle>
            <CardDescription>Estos datos son opcionales para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {fields.length > 0 && (
              <Table>
                <TableCaption>
                  <Button type="button" className="flex items-center gap-2" variant={"outline"} onClick={handleAddVariant}>
                    <PlusCircle />
                    Agregar Variante
                  </Button>
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Código de barras</TableHead>
                    {fields.length > 0 && <TableHead>Eliminar</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <ProductVariantForm key={field.id} index={index} register={register} error={errors.variants?.[index]} isLoading={isLoading} />
                  ))}
                </TableBody>
              </Table>
            )}
            {fields.length === 0 && (
              <Button type="button" className="flex items-center gap-2" variant={"outline"} onClick={handleAddVariant}>
                <PlusCircle />
                Agregar Variante
              </Button>
            )}
          </CardContent>
        </Card>
        <Button form="new-product-form" disabled={isLoading} className="flex items-center gap-2 mx-auto mt-8">
          {isLoading ? <Loader className="animate-spin" /> : <Check />}
          <span>Guardar producto</span>
        </Button>
      </div>
    </form>
  )
}
export default NewProductForm