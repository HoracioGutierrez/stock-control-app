"use client"
import { Loader, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { useOrderStore } from "@/stores/orderStore"
import { useState } from "react"
import { Label } from "../ui/label"
import { toast } from "../ui/use-toast"
import { useDialogStore } from "@/stores/generalDialog"
import { getProductByName } from "@/actions/getProductByName"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type Props = {
  userId: string
}

const schema = yup.object().shape({
  productName: yup.string().required("El nombre del producto es obligatorio")
})

function SearchProductForm({ userId }: Props) {

  const [productsFound, setProductsFound] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setScannedProduct, setProduct } = useOrderStore((state: any) => state)
  const { setClose } = useDialogStore((state: any) => state)
  const { handleSubmit, register, formState: { errors } } = useForm<any>({
    defaultValues: {
      productName: ""
    },
    resolver: yupResolver(schema)
  })

  const handleSearch = (data: any) => {
    setLoading(true)
    getProductByName(data.productName)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setProductsFound(data.data)
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            setProductsFound([])
            toast({
              variant: "destructive",
              title: "Producto no encontrado",
              description: "El producto no existe en nuestro inventario"
            })
            return setError("El producto no existe en nuestro inventario")
          }

          setProductsFound([])
          toast({
            variant: "destructive",
            title: "Error al obtener el producto",
            description: error.message
          })
          return setError(error.message)
        }

        setProductsFound([])
        toast({
          variant: "destructive",
          title: "Error al obtener el producto",
          description: "Ha ocurrido un error al obtener el producto, intente nuevamente o contacte al desarrollador."
        })
        return setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleAddProduct = (product: any) => {
    setProductsFound([])
    setScannedProduct(product)
    setClose()
  }

  return (
    <Card className="bg-transparent border-none">
      <form onSubmit={handleSubmit(handleSearch)}>
        <CardHeader className="p-0 pb-8">
          <CardDescription className="text-muted-foreground">Increse el nombre de un producto para comenzar la búsqueda</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid p-0">
          <div className="flex flex-col gap-4">
            <Label htmlFor="barcode">Nombre</Label>
            {errors.productName && <p className="text-red-500">{errors.productName.message as string}</p>}
            <Input placeholder="Ej.: Auriculares" id="barcode" {...register("productName")} />
          </div>
          <Button disabled={loading} className="flex items-center gap-2 text-white dark:text-primary-foreground">
            {loading ? <Loader className="animate-spin" /> : <Search />}
            <span>Buscar Producto</span>
          </Button>
          <ScrollArea className="h-full max-h-60">
            <div className="flex flex-col gap-4">
              {productsFound.length === 0 && (
                <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
                  <div className="max-w-sm text-center">
                    <p className="font-bold text-xl">No hay productos con ese nombre</p>
                    <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a ver productos luego de realizar un pedido de compra en la aplicación.</p>
                  </div>
                </div>
              )}
              {productsFound.length > 0 && (
                productsFound.map((product: any, i: number) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="hover:bg-accent md:p-4 rounded-md p2" onClick={() => { handleAddProduct(product) }}>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-lg">
                              {product.name} x ${product.price}
                            </p>
                          </div>
                          <p className="truncate">
                            ({product.description ?? "Sin descripción"})
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Selecciona este producto para agregarlo a la orden
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </form>
    </Card>
  )
}
export default SearchProductForm