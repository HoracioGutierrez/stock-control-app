"use client"
import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { ProductType } from "@/schema"
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
import { useOrderStore } from "@/stores/orderStore"

function OrderScanner() {

  const [hasEvent, setHasEvent] = useState<boolean>(false)
  const [scannedBarcode, setScannedBarcode] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [scanning, setScanning] = useState<boolean>(false)
  const [scannedProduct, setScannedProduct] = useState<ProductType | null>(null)
  const [products, setProducts] = useState<ProductType[]>([])
  const [total, setTotal] = useState<number>(0)

  let barcode = ""

  useEffect(() => {

    if (hasEvent) return
    setHasEvent(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key.length !== 1) return
      if (scanning) return

      const isScanning = true
      setScanning(isScanning)

      if (e.key === "Enter") {
        console.log(barcode)
        handleScan(barcode)
        setScanning(false)
        return
      }

      barcode += e.key
      console.log(e.key)

      setTimeout(() => {
        console.log("timeout")
        barcode = ""
      }, 600)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }

  }, [])

  const handleScan = (barcode: string) => {
    setScannedBarcode(barcode)
    getProductByBarcode(barcode)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setError("")
        setScanning(false)
        setScannedProduct(data.data)
        setTotal((total) => total + Number(data.data.price))
        setProducts((products) => {

          const productIndex = products.findIndex((p: any) => p.barcode === data.data.barcode)

          if (productIndex === -1) {
            data.data.count = 1
            return [data.data, ...products]
          } else {
            return [
              ...products.slice(0, productIndex),
              {
                ...products[productIndex],
                count: products[productIndex].count + 1
              },
              ...products.slice(productIndex + 1)
            ]
          }


        })
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            setError("El producto no existe en nuestro inventario")
          }
          return setError(error.message)
        }
        setError("Error al obtener el producto, intente nuevamente o contacte al desarrollador.")
      })
  }

  const handleIncrease = (product: any, index: number) => {
    const productsCopy = [...products]
    const productCopy = productsCopy[index]
    const newTotal = total + Number(productCopy.price)
    setTotal(newTotal)
    productCopy.count = productCopy.count ? productCopy.count + 1 : 2
    productsCopy[index] = productCopy
    setProducts(productsCopy)
  }

  const handleDecrease = (product: any, index: number) => {

    const productsCopy = [...products]
    const productCopy = productsCopy[index]
    const newTotal = total - Number(productCopy.price)

    if (newTotal < 0) return
    if (productCopy.count === 1) return

    setTotal(newTotal)
    productCopy.count = productCopy.count - 1
    productsCopy[index] = productCopy
    setProducts(productsCopy)
  }

  const handleRemove = (product: any, index: number) => {
    const productsCopy = [...products]
    const productCopy = productsCopy[index]
    const productTotal = productCopy.count * productCopy.price
    const newTotal = total - productTotal
    productsCopy.splice(index, 1)
    setTotal(newTotal)
    setProducts(productsCopy)
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4 mt-4">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-md">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-primary font-bold text-5xl">${total}</CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-muted-foreground text-md">Detalles</CardTitle>
          </CardHeader>
          <CardContent>
            {scannedProduct && (
              <p className="text-primary font-bold text-4xl">
                {scannedProduct.name} x ${scannedProduct.price}
              </p>
            )}
            <p className="text-muted-foreground">
              {scannedProduct && scannedProduct.description ? scannedProduct.description : "No hay descripción"}
            </p>
            {scannedProduct && (
              <p className="text-muted-foreground">
                codigo : {scannedProduct.barcode}
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <p className="text-muted-foreground">
              {scanning ? "Escaneando..." : "Esperando ingreso..."}
            </p>
          </CardFooter>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Código de barras</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No hay productos en la venta todavía
              </TableCell>
            </TableRow>
          )}
          {products.length > 0 && (
            products.map((product: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price} x {product.quantity || 1}</TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {product.count || 1}
                  <Button variant={"outline"} className="aspect-square p-0" onClick={() => handleIncrease(product, i)}>
                    <ArrowUp className="aspect-square p-0" />
                  </Button>
                  <Button variant={"outline"} className="aspect-square p-0" onClick={() => handleDecrease(product, i)}>
                    <ArrowDown className="aspect-square p-0" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className="aspect-square p-0" onClick={() => { handleRemove(product, i) }}>
                    <Trash2 className="aspect-square p-0" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default OrderScanner