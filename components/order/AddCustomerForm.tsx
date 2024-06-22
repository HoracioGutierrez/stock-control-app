"use client"
import { getAllCustomers } from "@/actions/getAllCustomers"
import { MouseEventHandler, useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { useOrderStore } from "@/stores/orderStore"
import { useDialogStore } from "@/stores/generalDialog"

function AddCustomerForm() {

  const [customers, setCustomers] = useState<any[]>([])
  const [clientId, setClientId] = useState<string>("")
  const { setClient } = useOrderStore((state: any) => state)
  const { setClose } = useDialogStore((state: any) => state)

  useEffect(() => {
    getAllCustomers()
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        setCustomers(data.data)
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error al obtener los clientes",
            description: error.message
          })
          return
        }
        toast({
          variant: "destructive",
          title: "Error al obtener los clientes",
          description: error.message
        })
      })
  }, [])

  const handleSetClient = (clientId: string) => {
    setClientId(clientId)
  }

  const handleSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setClient(clientId)
    setClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-transparent border-none">
        <CardHeader className="p-0 pb-8">
          <CardDescription>Aca podrás agregar un cliente a la orden</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-4">
            <Select onValueChange={handleSetClient}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cliente" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer: any) => (
                  <SelectItem key={customer.id} value={`${customer.id}@${customer.name}`}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Agregar Cliente</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
export default AddCustomerForm