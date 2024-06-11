"use client"

import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

function OrderScanner() {

  const [hasEvent, setHasEvent] = useState(false)
  const [scannedBarcode, setScannedBarcode] = useState("")
  const [error, setError] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
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
        setProducts((products) => [...products, data.data])
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

  return (
    <div>
      <div className="mb-4">
        <p>{scanning ? "Escaneando..." : "Esperando..."}</p>
        {scannedBarcode && <p>Codigo escaneado : {scannedBarcode}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {scannedProduct && (
          <Card className="bg-accent">
            <CardHeader>
              <CardTitle>Producto</CardTitle>
              <CardDescription>Nombre: {scannedProduct.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle>Detalles</CardTitle>
              <CardDescription>Descripción: {scannedProduct.description}</CardDescription>
              <CardDescription>Precio: {scannedProduct.price}</CardDescription>
              <CardDescription>Stock: {scannedProduct.stock}</CardDescription>
              <CardDescription>Código de barras: {scannedProduct.barcode}</CardDescription>
            </CardContent>
          </Card>
        )}
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Total: {total}</CardDescription>
          </CardContent>
        </Card>
      </div>
      {products.length > 0 && (
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
            {products.map((product, i) => (
              <TableRow key={i}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.barcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
export default OrderScanner