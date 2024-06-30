"use client"
import { getAllCustomers } from "@/actions/getAllCustomers"
import { MouseEventHandler, useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { useOrderStore } from "@/stores/orderStore"
import { useDialogStore } from "@/stores/generalDialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { createNewCustomer } from "@/actions/createNewCustomer"
import { Loader } from "lucide-react"
import { IconCheck, IconUserPlus, IconX } from "@tabler/icons-react"


type AddCustomerFormProps = {
  userId: string
}

function AddCustomerForm({ userId }: AddCustomerFormProps) {

  const [customers, setCustomers] = useState<any[]>([])
  const [clientId, setClientId] = useState<string>("")
  const [customer, setCustomer] = useState<any>({})
  const [isNewCustomerForm, setIsNewCustomerForm] = useState<boolean>(false)
  const { setClient } = useOrderStore((state: any) => state)
  const { setClose } = useDialogStore((state: any) => state)
  const [name, setName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

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

  const handleSetClient = (customer: any) => {
    setCustomer(JSON.parse(customer))
  }

  const handleSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setClient(customer)
    setClose()
  }

  const toggleOpenNewCustomerForm = () => {
    setIsNewCustomerForm(true)
  }

  const toggleCloseNewCustomerForm = () => {
    setIsNewCustomerForm(false)
  }

  const handleSaveNewCustomer = () => {
    const customer = {
      name: name,
    }
    setLoading(true)
    createNewCustomer(customer, userId)
      .then((data) => {
        if (data?.error) {
          throw new Error(data.error)
        }
        toast({
          title: "Cliente creado correctamente",
          description: "El cliente se ha creado correctamente, puedes verlo en la sección de clientes"
        })
        setClose()
        setIsNewCustomerForm(false)
        setClient({ ...customer, id: data.data.insertedId })

      })
      .catch((error) => {
        if (error instanceof Error) {
          return toast({
            variant: "destructive",
            title: "Error al crear el cliente",
            description: error.message
          })
        }
        return toast({
          variant: "destructive",
          title: "Error al crear el cliente",
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-8 text-muted-foreground text-sm">Aca podrás agregar un cliente a la orden seleccionandolo de la siguiente lista, o bien creando uno nuevo haciendo click en el boton "Crear nuevo cliente"</p>
      <div className="flex flex-col gap-4">
        {!isNewCustomerForm ? (
          <Select onValueChange={handleSetClient}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer: any) => (
                <SelectItem key={customer.id} value={`${JSON.stringify(customer)}`}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Nombre</Label>
            <Input type="text" placeholder="Nombre" onChange={handleSetName} />
          </div>
        )}
        {!isNewCustomerForm && (
          <Button className="group">
            <IconCheck className="group-hover:text-green-500 p-0 text-muted-foreground aspect-square" />
            Si, agregar a la orden
          </Button>
        )}
        <Button type="button" onClick={isNewCustomerForm ? handleSaveNewCustomer : toggleOpenNewCustomerForm} className="flex items-center gap-2 group">
          {loading && <Loader className="animate-spin" />}
          {!loading && <IconUserPlus className="group-hover:text-green-500 p-0 text-muted-foreground aspect-square" />}
          {isNewCustomerForm ? "Confirmar" : "Crear nuevo cliente"}
        </Button>
        {isNewCustomerForm && (
          <Button type="button" onClick={toggleCloseNewCustomerForm} className="flex items-center gap-2 group">
            <IconX className="group-hover:text-red-500 p-0 text-muted-foreground aspect-square" />
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
export default AddCustomerForm