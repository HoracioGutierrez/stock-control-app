"use client"

import { useEffect, useState } from "react"

type BarCodeScannerProps = {
  withTitle?: boolean,
  godMode?: boolean
}

function BarCodeScanner({ withTitle = false, godMode = false }: BarCodeScannerProps) {

  const [scannedBarcode, setScannedBarcode] = useState("")
  const [error, setError] = useState("")
  const [scanning, setScanning] = useState(false)
  const [hasEvent, setHasEvent] = useState(false)

  let barcode = ""

  useEffect(() => {

    if (hasEvent) return
    setHasEvent(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key !== "Enter" && e.key.length !== 1) return
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
    handleFetch(barcode)
  }

  const handleFetch = async (barcodeData: any) => {
    try {

      const response = await fetch("https://665b60c4003609eda460b828.mockapi.io/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ barcodeData })
      })
      await response.json()
    } catch (error) {
      setError("Error al enviar el código de barras, intente nuevamente o contacte al desarrollador.")
    }
  }

  return (
    <div>
      {withTitle && <h2>Scanner de Código de Barras</h2>}
      {scanning && <p>Escaneando...</p>}
      {!scanning  && <p>Esperando...</p>}
      {scannedBarcode && <p>Codigo escaneado : {scannedBarcode}</p>}
      {godMode && <button onClick={handleFetch}>Modo Dios Activado</button>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
export default BarCodeScanner