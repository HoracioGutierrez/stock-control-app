"use client"

import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import PouchDb from "pouchdb-browser"
import { useEffect, useState } from "react"

function CashRegisterTable() {

  const [cashRegisters, setCashRegisters] = useState<any[]>([])

  useEffect(() => {
    /* const t = getAllCashRegisters()

    console.log(t)
    t.then((data) => {
      console.log(data)
    })
      .catch((error) => {
        console.log(error)
      })
    fetch("/api/stock")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      }) */
    const getAllCashRegisters = async () => {
      try {
        const response = await fetch("/api/stock")
        const body = await response.json()
        if (body.error) {
          throw new Error("refetch")
        }
        setCashRegisters(body.data)
      } catch (error) {
        try {
          const db = new PouchDb('cashRegisters');
          const response = await db.allDocs({ include_docs: true });
          const data = response.rows.map((row) => row.doc)
          setCashRegisters(data)
        } catch (error) {
          console.log(error)
        }
      }
    }

    getAllCashRegisters()

  }, [])

  return (
    <div>{JSON.stringify(cashRegisters)}</div>
  )
}
export default CashRegisterTable