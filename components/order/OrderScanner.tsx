"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ArrowDown, ArrowUp, Barcode, ScanBarcode, Search, Trash2, X } from "lucide-react"
import CloseCashRegisterButton from "../cashRegister/CloseCashRegisterButton"
import { BarcodeScanner, DetectedBarcode } from 'react-barcode-scanner'
import { getProductByBarcode } from "@/actions/getProductByBarcode"
import { useDialogStore } from "@/stores/generalDialog"
import CancelOrderButton from "./CancelOrderButton"
import { useOrderStore } from "@/stores/orderStore"
import CustomButton from "../layout/CustomButton"
import { useEffect, useRef, useState } from "react"
import "react-barcode-scanner/polyfill"
import OrderButton from "./OrderButton"
import { Button } from "../ui/button"
import { useHotkeys } from 'react-hotkeys-hook'


type OrderScannerProps = {
  data: any
}

function OrderScanner({ data }: OrderScannerProps) {

  const [hasEvent, setHasEvent] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [scanning, setScanning] = useState<boolean>(false)
  const { setOpen } = useDialogStore((state: any) => state)
  const [camScan, setCamScan] = useState<boolean>(false)
  const { products, setScannedProduct, increment, decrement, total, remove, setProduct, scannedProduct, customer } = useOrderStore((state: any) => state)
  const scannerRef = useRef<HTMLDivElement | null>(null)

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
        handleScan(barcode)
        setScanning(false)
        return
      }

      barcode += e.key

      setTimeout(() => {
        barcode = ""
      }, 600)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }

  }, [])

  const handleScan = (barcode: string) => {
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

  const handleCapture = (barcode: DetectedBarcode) => {
    handleScan(barcode.rawValue)
    setCamScan(false)
  }

  const handleSearch = () => {
    setOpen("search")
  }

  const handleCloseScanner = () => {
    setCamScan(false)
    setScanning(false)
  }

  useHotkeys("alt+b", handleSearch)
  useHotkeys("alt+m", handleManualScan)
  useHotkeys("alt+c", handleCamScan)
  useHotkeys("alt+i", () => { setOpen("manual-income") })
  useHotkeys("alt+q", () => { setOpen("close-cash-register") })
  useHotkeys("alt+v", () => { if (products.length > 0) { handlePayWith() } })
  useHotkeys("alt+n", () => { if (products.length > 0) { handleAddCustomer() } })
  useHotkeys("alt+g", () => { if (products.length > 0) { setOpen("save-order") } })

  return (
    <section className="flex flex-col h-full" ref={scannerRef}>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-4 mb-4">
        <Card className="bg-accent">
          <CardHeader className="max-sm:p-2 max-sm:pb-0">
            <CardTitle className="text-md text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent className="max-sm:p-2 max-sm:pt-0">
            <CardDescription className="font-bold text-2xl text-primary lg:text-5xl">${total}</CardDescription>
            <CardDescription className="flex flex-col text-lg text-muted-foreground">
              {customer.id && <span>Cliente: {customer.name}</span>}
              {customer.currentAmount < 0 && <span className="font-bold text-red-400">Balance actual : ${customer.currentAmount}</span>}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-accent">
          <CardHeader className="max-sm:p-2 max-sm:pb-0">
            <CardTitle className="text-md text-muted-foreground">Último Producto</CardTitle>
          </CardHeader>
          <CardContent className="max-sm:p-2 max-sm:pt-0">
            {scannedProduct && (
              <p className="font-bold text-2xl text-primary lg:text-4xl">
                {scannedProduct.name} x ${scannedProduct.price}
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <p className="max-sm:mb-2 text-muted-foreground max-sm:text-sm">
              {scannedProduct && scannedProduct.description ? scannedProduct.description : "No hay descripción"}
            </p>
            {scannedProduct && (
              <p className="font-bold text-muted-foreground max-sm:text-sm">
                codigo : {scannedProduct.barcode}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end items-end gap-4 max-sm:p-2 max-sm:pt-4">
            <p className="text-muted-foreground">
              {scanning ? "Escaneando..." : "Esperando ingreso..."}
            </p>
            <CustomButton onClick={handleSearch} tooltip="Busqueda de producto (alt + b)">
              <Search />
            </CustomButton>
            <CustomButton onClick={handleManualScan} tooltip="Codigo Manual (alt + m)">
              <Barcode />
            </CustomButton>
            <CustomButton onClick={handleCamScan} tooltip="Escaneo con Camara (alt + c)">
              <ScanBarcode />
            </CustomButton>
          </CardFooter>
        </Card>
      </div>

      <div className="max-sm:py-8 overflow-auto grow">
        <Table className="max-sm:py-8 overflow-auto grow">
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
      </div>

      <div className="justify-center gap-4 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        <CustomButton onClick={handlePayWith} disabled={products.length === 0} tooltip="Calcula el vuelto de la orden ingresando el monto con el cual desea pagar (alt + v)">
          Calcular Vuelto
        </CustomButton>
        <CustomButton onClick={handleAddCustomer} disabled={products.length === 0} tooltip="Agrega un cliente existente o crea uno nuevo para agregar a la orden (alt + n)">
          Agregar Cliente
        </CustomButton>
        <CustomButton tooltip="Ingresar dinero manualmente a la caja actual (alt + i)" dialogType="manual-income" className="truncate">
          Ingreso/Retiro Manual
        </CustomButton>
        <CloseCashRegisterButton />
        <CancelOrderButton />
        <OrderButton />
      </div>

      {camScan && (
        <div className="top-0 left-0 z-10 fixed bg-black/50 backdrop-blur-sm w-screen h-screen">
          <CustomButton className="top-2 right-2 z-20 fixed" onClick={handleCloseScanner}>
            <X />
          </CustomButton>
          <BarcodeScanner
            onCapture={handleCapture}
            className="top-0 left-0 z-10 fixed w-screen h-screen"
            options={{
              formats: ["code_128", "code_39", "code_93", "codabar", "ean_13", "ean_8", "itf", "qr_code", "upc_a", "upc_e"]
            }}
          />
        </div>
      )}
    </section>
  )
}
export default OrderScanner