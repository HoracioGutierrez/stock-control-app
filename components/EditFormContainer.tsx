"use client"
import { entityConfig, formVariants, formNamesVariants, formDetailsVariants } from "@/lib/formConfig"
import { SubmitHandler, useForm, useFieldArray, set } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValues, InputValues } from "@/lib/types"
import { editById } from "@/actions/editById"
import { getById } from "@/actions/getById"
import { toast } from "./ui/use-toast"
import EditForm from "./EditForm"
import { useState } from "react"
import { useDialogStore } from "@/stores/generalDialog"


function EditFormContainer({ entity, barcode, customerId, hasVariants }: any) {
    const [error, setError] = useState<string | null>(null)
    const [mainName, setMainName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [idResolve, setIdResolve] = useState<string>("")
    const [isVariant, setIsVariant] = useState<boolean>(false)
    const conditionalEntity = entity === "customer" ? "Cliente" : "Producto"

    const formForName = formNamesVariants[entity]
    const formForDetails = formDetailsVariants[entity]
    const formForVariant = formVariants[entity]

    const { setClose } = useDialogStore((state: any) => state)

    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>({
        defaultValues: async () => {
            setLoading(true)
            const { data, error } = await getById(entity, customerId, barcode)
            setLoading(false)
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
            setIsVariant(data.isVariant as boolean)
            console.log(data)
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
                isVariant: data.isVariant as boolean,
            }
        },
        resolver: yupResolver(entityConfig[entity].schema),
    })

    const { fields, append } = useFieldArray({
        control,
        name: "variants"
    })

    const onSubmit: SubmitHandler<InputValues> = async (data: InputValues) => {
        setLoading(true)
        editById(entity, idResolve, data)
            .then((data) => {
                if (data?.error) {
                    throw new Error(data.error)
                }
                toast({
                    title: `${conditionalEntity} editado correctamente`,
                    description: `${conditionalEntity} actualizado correctamente en la base de datos`,
                })
                setClose()
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return setError(error.message)
                }
                setError(`Error al editar el ${conditionalEntity}, intente nuevamente o contacte al desarrollador.`)
                toast({
                    variant: "destructive",
                    title: `Error al editar el ${conditionalEntity}`,
                    description: error.message
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }


    const handleMainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setMainName(newName)
    }

    const handleAddVariant = () => {
        append({ name: getValues("name"), price: getValues("price"), stock: 0, barcode: "" })
    }


    const formProps = {
        entity,
        loading,
        register,
        errors,
        isVariant,
        data: idResolve,
        formForName,
        formForDetails,
        formForVariant,
        entityConfig,
        conditionalEntity,
        handleMainNameChange,
        handleAddVariant,
        fields,
        hasVariants
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-auto" id={entityConfig[entity].formId}>
                <EditForm {...formProps} />
            </form>
        </>
    )
}

export default EditFormContainer