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
import { useDialogStore } from "@/stores/generalDialog"

function NewProductForm({ userId }: NewProductFormProps) {

  const [error, setError] = useState<string | null>(null)
  const [mainName, setMainName] = useState<string>("")
  const { setIsLoading, isLoading } = useNewProductStore((state: any) => ({ isLoading: state.isLoading, setIsLoading: state.setIsLoading }))
  const { setClose } = useDialogStore((state: any) => state)
  const { control, register, handleSubmit, formState: { errors, dirtyFields, isDirty }, getValues } = useForm<ProductInputValues>({
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

    if (!isDirty) return
    setIsLoading(true)

    const dataFull: any = data;
    const dataDirty = Object.keys(dirtyFields).reduce((acc: any, key: any) => {
      return { ...acc, [key]: dataFull[key] };
    }, {});

    createNewProduct(userId, dataDirty, getValues("variants"))
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto creado correctamente",
          description: "El producto se ha creado correctamente, puedes verlo en la sección de productos"
        })
        setClose()
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error al crear el producto",
            description: error.message
          })
          return setError(error.message)
        }
        setError("Error al crear el producto, intente nuevamente o contacte al desarrollador.")
        toast({
          variant: "destructive",
          title: "Error al crear el producto",
          description: "Ha ocurrido un error al crear el producto, intente nuevamente o contacte al desarrollador."
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
    <form onSubmit={handleSubmit(onSubmit)} className="gap-8 grid grid-cols-1 lg:grid-cols-2" id="new-product-form">
      <div className="self-stretch">
        <Card className="bg-primary-foreground h-full">
          <CardHeader className="max-sm:p-2">
            <CardTitle>Detalles</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 grid max-sm:p-2">
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Nombre</Label>
                {errors.name && <p className="font-bold text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <Input type="text" disabled={isLoading} placeholder="Producto" {...register("name", { onChange: handleMainNameChange })} />
            </div>
            <div className="gap-2 grid">
              <div>
                {errors.description && <p className="font-bold text-red-500 text-sm">{errors.description.message}</p>}
              </div>
              <Label htmlFor="description" className="text-muted-foreground">Descripción</Label>
              <Textarea disabled={isLoading} placeholder="Descripción" {...register("description")} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="bg-primary-foreground">
          <CardHeader className="max-sm:p-2">
            <CardTitle>Precio</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 grid max-sm:p-2">
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="price" className="text-muted-foreground">Precio</Label>
                {errors.price && <p className="font-bold text-red-500 text-sm">{errors.price.message as string}</p>}
              </div>
              <Input type="number" placeholder="Precio" {...register("price")} disabled={isLoading} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="stock" className="text-muted-foreground">Stock</Label>
                {errors.stock && <p className="font-bold text-red-500 text-sm">{errors.stock.message as string}</p>}
              </div>
              <Input type="number" placeholder="Stock" {...register("stock")} disabled={isLoading} />
            </div>
            <div className="gap-2 grid">
              <div>
                <Label htmlFor="barcode" className="text-muted-foreground">Código de barras</Label>
                {errors.barcode && <p className="font-bold text-red-500 text-sm">{errors.barcode.message as string}</p>}
              </div>
              <Input type="text" placeholder="Código de barras" {...register("barcode")} disabled={isLoading} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-full">
        <Card className="bg-primary-foreground">
          <CardHeader className="max-sm:p-2">
            <CardTitle>Variantes</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 grid max-sm:p-2">
            {fields.length > 0 && (
              <Table className="min-w-[600px]">
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
                    <ProductVariantForm key={field.id} index={index} register={register} error={errors.variants?.[index]} isLoading={isLoading} onRemove={remove} />
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
        <Button form="new-product-form" disabled={isLoading || !isDirty} className="flex items-center gap-2 mx-auto mt-8 group" onClick={handleSubmit(onSubmit)}>
          {isLoading ? <Loader className="animate-spin" /> : <Check className="group-hover:text-green-500 text-muted-foreground aspect-square" />}
          <span className="text-muted-foreground">Guardar Producto</span>
        </Button>
      </div>
    </form>
  )
}
export default NewProductForm