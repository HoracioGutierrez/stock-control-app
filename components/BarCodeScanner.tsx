"use client"

import { useEffect, useState } from "react"

type BarCodeScannerProps = {
  withTitle?: boolean,
  godMode?: boolean
}

function BarCodeScanner({ withTitle = false, godMode = false }: BarCodeScannerProps) {

  const [scannedBarcode, setScannedBarcode] = useState("")
  const [error, setError] = useState("")
  let barcode = ""

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log(barcode)
        handleScan(barcode)
        return
      }

      if (e.shiftKey) {
        return;
      }

      barcode += e.key
      setTimeout(() => {
        barcode = ""
      }, 100)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", () => handleKeyDown)
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
        body: JSON.stringify({barcodeData})
      })
      await response.json()
    } catch (error) {
      setError("Error al enviar el código de barras, intente nuevamente o contacte al desarrollador.")
    }
  }

  return (
    <div>
      {withTitle && <h2>Scanner de Código de Barras</h2>}
      {scannedBarcode && <p>Codigo escaneado : {scannedBarcode}</p>}
      {!scannedBarcode && <p>Esperando...</p>}
      {godMode && <button onClick={handleFetch}>Modo Dios Activado</button>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
export default BarCodeScanner