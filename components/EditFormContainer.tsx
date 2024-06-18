"use client"
import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { useState } from "react"
import { toast } from "./ui/use-toast"
import { editById } from "@/actions/editById"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValues, InputValues } from "@/lib/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useProductDialogStore } from "@/stores/productDialogStore"
import EditForm from "./EditForm"
import { getById } from "@/actions/getById"
import { entityConfig } from "@/lib/formConfig"


function EditFormContainer({ entity, barcode, customerId }: any) {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [idResolve, setIdResolve] = useState<string>("")
    const { handleClose } = useCustomerDialogStore((state: any) => state)
    const { close } = useProductDialogStore((state: any) => state)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: async () => {
            const { data, error } = await getById(entity, customerId, barcode)
            if (error) {
                return entity === "customer" ? {
                    name: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    address: "",
                    legalName: "",
                    cuitCuil: "",
                } : {
                    name: "",
                    description: "",
                    price: 0,
                    barcode: "",
                    stock: 0,
                }
            }
            setIdResolve(data.id as string)
            return entity === "customer" ? {
                name: data.name as string,
                lastName: data.lastName as string,
                phone: data.phone as string,
                email: data.email as string,
                address: data.address as string,
                legalName: data.legalName as string,
                cuitCuil: data.cuitCuil as string,
            } : {
                name: data.name as string,
                description: data.description as string,
                price: data.price as number,
                barcode: data.barcode as string,
                stock: data.stock as number,
            }
        },
        resolver: yupResolver(entityConfig[entity].schema),
    })


    const onSubmit: SubmitHandler<InputValues> = async (data: InputValues) => {
        setLoading(true)
        editById(entity, idResolve, data)
            .then((data) => {
                if (data?.error) {
                    throw new Error(data.error)
                }
                toast({
                    title: `${entity.charAt(0).toUpperCase() + entity.slice(1)} editado correctamente`,
                    description: `${entity.charAt(0).toUpperCase() + entity.slice(1)} editado correctamente`,
                })
                close()
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return setError(error.message)
                }
                setError(`Error al editar el ${entity}, intente nuevamente o contacte al desarrollador.`)
                toast({
                    variant: "destructive",
                    title: `Error al editar el ${entity}`,
                    description: error.message
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8" id={entityConfig[entity].formId}>
                <EditForm entity={entity} loading={loading} register={register} errors={errors} data={idResolve} />
            </form>
        </>
    )
}

export default EditFormContainer