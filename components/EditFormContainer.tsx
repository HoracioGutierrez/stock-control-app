"use client"
import { entityConfig, formVariants, formNamesVariants, formDetailsVariants, defaultValue } from "@/lib/formConfig"
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormValues, InputValues, SchemaFormValues } from "@/lib/types"
import { editById } from "@/actions/editById"
import { getById } from "@/actions/getById"
import { toast } from "./ui/use-toast"
import EditForm from "./EditForm"
import { useState } from "react"
import { useDialogStore } from "@/stores/generalDialog"


function EditFormContainer({ entityType, barcode, entityId, hasVariants, userId, hasDetails }: any) {
    const [error, setError] = useState<string | null>(null)
    const [mainName, setMainName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [idResolve, setIdResolve] = useState<string>("")
    const [isVariant, setIsVariant] = useState<boolean>(false)

    const conditionalEntity: Record<string, string> = {
        "provider": "Proveedor",
        "customer": "Cliente",
        "product": "Producto",
        "cashRegister": "Caja",
    }
    const entityResolved = conditionalEntity[entityType]

    const formForName = formNamesVariants[entityType]
    const formForDetails = formDetailsVariants[entityType]
    const formForVariant = formVariants[entityType]

    const { setClose } = useDialogStore((state: any) => state)

    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>({
        defaultValues: async () => {
            setLoading(true)
            const { data, error } = await getById(entityType, entityId, barcode)
            setLoading(false)
            if (error) {
                return defaultValue[entityType as keyof typeof defaultValue] as SchemaFormValues
            }
            setIdResolve(data.id as string)
            setIsVariant(data.isVariant as boolean)
            return data as SchemaFormValues
        },
        resolver: yupResolver(entityConfig[entityType].schema),
    })

    const { fields, append } = useFieldArray({
        control,
        name: "variants"
    })

    const onSubmit: SubmitHandler<InputValues> = async (data: InputValues) => {
        setLoading(true)
        editById(entityType, idResolve, data, userId)
            .then((data) => {
                if (data?.error) {
                    throw new Error(data.error)
                }
                toast({
                    title: `${entityResolved} editado correctamente`,
                    description: `${entityResolved} actualizado correctamente en la base de datos`,
                })
                setClose()
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return setError(error.message)
                }
                setError(`Error al editar el ${entityResolved}, intente nuevamente o contacte al desarrollador.`)
                toast({
                    variant: "destructive",
                    title: `Error al editar el ${entityResolved}`,
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
        entityType,
        loading,
        register,
        errors,
        isVariant,
        data: idResolve,
        formForName,
        formForDetails,
        formForVariant,
        entityConfig,
        entityResolved,
        handleMainNameChange,
        handleAddVariant,
        fields,
        hasVariants,
        hasDetails
    }

    return (
        <>
            {hasDetails && <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-auto" id={entityConfig[entityType].formId}>
                <EditForm {...formProps} />
            </form>}
            {hasDetails == false && <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-auto" id={entityConfig[entityType].formId}>
                <EditForm {...formProps} />
            </form>}
        </>
    )
}

export default EditFormContainer