"use client"
import { useState } from 'react'
import { BarcodeScanner, DetectedBarcode } from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"

function Page() {
  
  const [scannedBarcode, setScannedBarcode] = useState("")

  const handleCapture = (barcode: DetectedBarcode) => {
    setScannedBarcode(barcode.rawValue)
  }

  return (
    <div className='p-4'>
      <BarcodeScanner onCapture={handleCapture}/>
      {!scannedBarcode && <p>Esperando...</p>}
      {scannedBarcode && <p>{scannedBarcode}</p>}
    </div>
  )
}
export default Page