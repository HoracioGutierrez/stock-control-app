"use client"
import { Input } from "./ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "@/lib/schemas"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { EditProductVariantsFormProps, ProductInputValues } from "@/lib/types"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Check, Loader, PlusCircle } from "lucide-react"
import ProductVariantForm from "./ProductVariantForm"
import { toast } from "./ui/use-toast"
import { getProductWithVariantsByBarcode } from "@/actions/getProductWithVariantsByBarcode"
import { saveProductEditWithVariants } from "@/actions/saveProductEditWithVariants"
import { editById } from "@/actions/editById"
import { useDialogStore } from "@/stores/generalDialog"
import { unlinkVariant } from "@/actions/unlinkVariant"


function EditProductVariantsForm({ barcode, userId }: EditProductVariantsFormProps) {

  const [error, setError] = useState<string | null>(null)
  const [mainName, setMainName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [productId, setProductId] = useState<string>("")
  const { id } = useDialogStore((state: any) => state)
  const { control, register, handleSubmit, formState: { errors }, reset, getValues } = useForm<ProductInputValues>({
    defaultValues: async () => {
      setLoading(true)
      const { data, error } = await getProductWithVariantsByBarcode(barcode)
      setLoading(false)
      if (error) {
        return {
          name: "",
          description: "",
          price: 0,
          barcode: "",
          stock: 0,
          variants: []
        }
      }
      setProductId(data.id as string)
      return {
        name: data.name as string,
        description: data.description as string,
        price: data.price as number,
        stock: data.stock as number,
        barcode: data.barcode as string,
        variants: data.variants as any[]
      }
    },
    resolver: yupResolver(productSchema),
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants"
  })

  const onSubmit: SubmitHandler<ProductInputValues> = (data: ProductInputValues) => {
    setLoading(true)
    saveProductEditWithVariants(barcode, data, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Producto editado correctamente",
          description: "El producto se ha editado correctamente de la base de datos",
        })
        reset()
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

  const handleMainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setMainName(newName)
  }

  const handleAddVariant = () => {
    append({ name: getValues("name"), price: getValues("price"), stock: 0, barcode: "", canRemove: true })
  }

  const handleRemoveVariant = (index: number) => {
    remove(index)
  }

  const handleUnlinkVariant = (index: number, barcode: string) => {
    update(index, { isUnlinking: true })
    //editById("product", id, { productId: null, isVariant: false }, userId)
    unlinkVariant(barcode, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Variante eliminada correctamente",
          description: "La variante se ha eliminado correctamente de la base de datos",
        })
        //update(index, { isUnlinking: false })
        remove(index)
      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al eliminar la variante",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al eliminar la variante",
          description: "Error al eliminar la variante",
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-8 grid grid-cols-1 lg:grid-cols-2 overflow-auto" id="new-product-form">
      <div className="self-stretch">
        <Card className="bg-primary-foreground h-full">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
            <CardDescription>Estos detalles son obligatorios para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid">
            <div className="gap-2 grid">
              <Label htmlFor="name" className="text-muted-foreground">Nombre</Label>
              <Input type="text" disabled={loading} placeholder="Producto" {...register("name", { onChange: handleMainNameChange })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="description" className="text-muted-foreground">Descripción</Label>
              <Textarea disabled={loading} placeholder="Descripción" {...register("description")} />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle>Precio</CardTitle>
            <CardDescription>Estos datos son opcionales para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid">
            <div className="gap-2 grid">
              <Label htmlFor="price" className="text-muted-foreground">Precio</Label>
              <Input type="number" placeholder="Precio" {...register("price")} disabled={loading} />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="stock" className="text-muted-foreground">Stock</Label>
              <Input type="number" placeholder="Stock" {...register("stock")} disabled={loading} />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="barcode" className="text-muted-foreground">Código de barras</Label>
              <Input type="text" placeholder="Código de barras" {...register("barcode")} disabled={loading} />
              {errors.barcode && <p className="text-red-500">{errors.barcode.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-full">
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle>Variantes</CardTitle>
            <CardDescription>Estos datos son opcionales para que el producto pueda crearse correctamente.</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid">
            {fields.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Código de barras</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <ProductVariantForm key={field.id} index={index} register={register} error={errors.variants?.[index]} isLoading={loading} canRemove={field.canRemove || false} onRemove={handleRemoveVariant} handleUnlinkVariant={handleUnlinkVariant} isUnlinking={field.isUnlinking || false} id={field.barcode} />
                  ))}
                </TableBody>
              </Table>
            )}
            <Button type="button" className="flex items-center gap-2" variant={"outline"} onClick={handleAddVariant}>
              <PlusCircle />
              Agregar Variante
            </Button>
          </CardContent>
        </Card>
        <Button disabled={loading} className="flex items-center gap-2 mx-auto mt-8">
          {loading ? <Loader className="animate-spin" /> : <Check />}
          <span>Guardar producto</span>
        </Button>
      </div>
    </form>
  )
}
export default EditProductVariantsForm