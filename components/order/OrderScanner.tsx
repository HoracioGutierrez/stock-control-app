"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { ArrowDown, ArrowUp, Barcode, ScanBarcode, Trash2 } from "lucide-react"
import { useOrderStore } from "@/stores/orderStore"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/generalDialog"
import CloseCashRegisterButton from "../cashRegister/CloseCashRegisterButton"
import CancelOrderButton from "./CancelOrderButton"
import OrderButton from "./OrderButton"
import { BarcodeScanner, DetectedBarcode } from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"

type OrderScannerProps = {
  data: any
}

function OrderScanner({ data }: OrderScannerProps) {

  const [hasEvent, setHasEvent] = useState<boolean>(false)
  const [scannedBarcode, setScannedBarcode] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [scanning, setScanning] = useState<boolean>(false)
  const { setOpen } = useDialogStore((state: any) => state)
  const [camScan, setCamScan] = useState<boolean>(false)
  const { products, setScannedProduct, increment, decrement, total, remove, setProduct, scannedProduct, clientId } = useOrderStore((state: any) => state)

  let barcode = ""

  useEffect(() => {

    if (hasEvent) return
    setHasEvent(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.key) return
      if (e.key !== "Enter" && e.key.length !== 1) return
      if (scanning) return

      const isScanning = true
      setScanning(isScanning)

      if (e.key === "Enter") {
        //console.log(barcode)
        handleScan(barcode)
        setScanning(false)
        return
      }

      barcode += e.key
      //console.log(e.key)

      setTimeout(() => {
        //console.log("timeout")
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
      })
      .catch((error) => {
        setProduct(null)
        if (error instanceof Error) {
          if (error.message === "Producto no encontrado") {
            setError("El producto no existe en nuestro inventario")
          }
          return setError(error.message)
        }
        setError("Error al obtener el producto, intente nuevamente o contacte al desarrollador.")
      })
  }

  const handleManualScan = () => {
    setOpen("manual-scan")
  }

  const handleAddCustomer = () => {
    setOpen("add-customer")
  }

  const handlePayWith = () => {
    setOpen("pay-with")
  }

  const handleCamScan = () => {
    setCamScan(true)
  }

  const handleCapture = (barcode:DetectedBarcode) => {
    alert(barcode.rawValue)
    handleScan(barcode.rawValue)
    setCamScan(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-4 mb-4">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-md text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="font-bold text-5xl text-primary">${total}</CardDescription>
            <CardDescription className="text-muted-foreground">
              {clientId && <p>Cliente: {clientId.split("@")[1]}</p>}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-md text-muted-foreground">Ultimo Producto</CardTitle>
          </CardHeader>
          <CardContent>

            {scannedProduct && (
              <p className="font-bold text-4xl text-primary">
                {scannedProduct.name} x ${scannedProduct.price}
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-muted-foreground">
              {scannedProduct && scannedProduct.description ? scannedProduct.description : "No hay descripción"}
            </p>
            {scannedProduct && (
              <p className="text-muted-foreground">
                codigo : {scannedProduct.barcode}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end items-end gap-4">
            <p className="text-muted-foreground">
              {scanning ? "Escaneando..." : "Esperando ingreso..."}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleManualScan}>
                    <Barcode />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Escaneao Manual</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCamScan}>
                    <ScanBarcode/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Escaneao con camara</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>

      <Table className="grow">
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
                  <Button variant={"outline"} className="p-0 aspect-square" onClick={() => increment(product, i)}>
                    <ArrowUp className="p-0 aspect-square" />
                  </Button>
                  <Button variant={"outline"} className="p-0 aspect-square" onClick={() => decrement(product, i)}>
                    <ArrowDown className="p-0 aspect-square" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className="p-0 aspect-square" onClick={() => { remove(product, i) }}>
                    <Trash2 className="p-0 aspect-square" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="justify-center gap-4 grid grid-cols-2 lg:grid-cols-5">
        <Button onClick={handlePayWith} disabled={products.length === 0}>
          Paga con
        </Button>
        <Button onClick={handleAddCustomer} disabled={products.length === 0}>
          Agregar Cliente
        </Button>
        <OrderButton />
        <CancelOrderButton />
        <CloseCashRegisterButton />
      </div>
      {camScan && ( <BarcodeScanner onCapture={handleCapture}/>)}
    </div>
  )
}
export default OrderScanner