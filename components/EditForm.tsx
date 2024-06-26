"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Check, Loader, PlusCircle } from "lucide-react"
import { FormEditProps } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import ProductVariantForm from "./ProductVariantForm"
import { Key, useState } from "react"
import CustomButton from "./layout/CustomButton"
import { editById } from "@/actions/editById"
import { toast } from "./ui/use-toast"



function EditForm({ entityType, loading, register, errors, data, formForVariant, formForName, formForDetails, entityConfig, entityResolved, isVariant, handleMainNameChange, handleAddVariant, fields, hasVariants = false, hasDetails = false, userId }: FormEditProps) {

    const [isVariantUnlinking, setIsVariantUnlinking] = useState<boolean>(false)
    const [loadingUnlink, setLoadingUnlink] = useState<boolean>(false)

    const handleVariantUnlink = () => {
        setIsVariantUnlinking(true)
    }

    const cancelVariantUnlink = () => {
        setIsVariantUnlinking(false)
    }

    const handleVariantUnlinkConfirm = () => {
        setLoadingUnlink(true)
        editById(entityType, data, { productId: null , isVariant : false }, userId)
            .then((data) => {
                if (data?.error) {
                    throw new Error(data.error)
                }
                toast({
                    title: "Variante eliminada correctamente",
                    description: "La variante se ha eliminado correctamente de la base de datos",
                })
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return toast({
                        variant: "destructive",
                        title: "Error al eliminar la variante",
                        description: error.message
                    })
                }
                return toast({
                    variant: "destructive",
                    title: "Error al eliminar la variante",
                    description: "Error al eliminar la variante",
                })
            })
            .finally(() => {
                setLoadingUnlink(false)
                setIsVariantUnlinking(false)
            })
    }

    return (
        <>
            {!isVariantUnlinking && (
                <div className="self-stretch">
                    {hasDetails === false &&
                        <div className="flex flex-col justify-center items-center">
                            <Card className="bg-primary-foreground">
                                <CardHeader>
                                    <CardTitle>
                                        Detalles de {entityResolved}
                                    </CardTitle>
                                    <CardDescription>
                                        Estos detalles son obligatorios para que el
                                        {entityResolved}
                                        pueda crearse correctamente.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="">
                                    {Object.keys(formForName).map((key, index) => {
                                        return (
                                            <div className="" key={index}>
                                                <Label htmlFor={formForName[key].name}>
                                                    {formForName[key].label}
                                                </Label>
                                                <Input type={formForName[key].inputType}
                                                    placeholder={formForName[key].label}
                                                    {...register(formForName[key].name,
                                                        { disabled: loading })} />
                                                {errors[formForName[key].name] &&
                                                    (<p className="text-red-500"></p>)}
                                            </div>
                                        )
                                    })
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    }
                    {hasDetails && <Card className="bg-primary-foreground h-full">
                        <CardHeader>
                            <CardTitle>
                                Detalles de {entityResolved}
                            </CardTitle>
                            <CardDescription>
                                Estos detalles son obligatorios para que el
                                {entityResolved}
                                pueda crearse correctamente.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="gap-4 grid">
                            {Object.keys(formForName).map((key, index) => {
                                return (
                                    <div className="gap-2 grid" key={index}>
                                        <Label htmlFor={formForName[key].name}>
                                            {formForName[key].label}
                                        </Label>
                                        <Input type={formForName[key].inputType}
                                            placeholder={formForName[key].label}
                                            {...register(formForName[key].name,
                                                { disabled: loading })} />
                                        {errors[formForName[key].name] &&
                                            (<p className="text-red-500">
                                                {errors[formForName[key].name].message}
                                            </p>)}
                                    </div>
                                )
                            })
                            }
                        </CardContent>
                    </Card>}
                </div>
            )}

            {(hasDetails && !isVariantUnlinking) && (
                <div>
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <CardTitle>Detalles Adicionales</CardTitle>
                            <CardDescription>
                                Estos datos son opcionales para crear el
                                {entityResolved}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="gap-4 grid">
                            <div className="gap-2 grid">
                                {Object.keys(formForDetails).map((key, index) => {
                                    return (
                                        <div className="gap-2 grid" key={index}>
                                            <Label htmlFor={formForDetails[key].name}>
                                                {formForDetails[key].label}
                                            </Label>
                                            <Input type={formForDetails[key].inputType}
                                                placeholder={formForDetails[key].label}
                                                {...register(formForDetails[key].name, { disabled: loading })} />
                                            {errors[formForDetails[key].name] &&
                                                (<p className="text-red-500">
                                                    {errors[formForDetails[key].name].message}
                                                </p>)}
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div >
            )}

            {(hasVariants && !isVariantUnlinking) && (
                <div className="col-span-full">
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Variantes</CardTitle>
                            <CardDescription>Variantes de {entityResolved}.</CardDescription>
                        </CardHeader>
                        <CardContent className="gap-4 grid">
                            <div className="flex justify-end items-center">
                                {formForVariant && Object.keys(formForVariant).map((key, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="gap-2 grid">
                                                    <TableHead >
                                                        <Label htmlFor={formForVariant[key].name}>{formForVariant[key].label}</Label>
                                                    </TableHead>
                                                    <Input type={formForVariant[key].inputType} placeholder={formForVariant[key].label} {...register(formForVariant[key].name, { disabled: loading })} className="mt-2" />
                                                    {errors[formForVariant[key].name] &&
                                                        (<p className="text-red-500">
                                                            {errors[formForVariant[key].name].message}
                                                        </p>)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </div>
                            {fields.length > 0 && (
                                <Table>
                                    <TableBody>
                                        {fields.map((field: { id: Key | null | undefined }, index: number) => (
                                            <ProductVariantForm key={field.id} index={index} register={register} error={errors.variants?.[index]} isLoading={loading} />
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                            {fields.length >= 0 && (
                                <Button type="button" className="flex items-center gap-2" variant={"outline"} onClick={handleAddVariant}>
                                    <PlusCircle />
                                    Agregar Variante
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div >
            )}

            {isVariantUnlinking && (
                <div className="col-span-full">
                    <p className="text-muted-foreground">Estás a punto de eliminar este producto como variante de otro El producto seguira estando en el inventario pero no formara parte de las variantes de otro producto. ¿Está seguro de que desea continuar?</p>
                </div>
            )}

            <div className="flex justify-center items-center gap-8 col-span-full">
                {(isVariant && !isVariantUnlinking) && <CustomButton onClick={handleVariantUnlink}>desvincular variante</CustomButton>}
                {isVariantUnlinking && (
                    <>
                        <CustomButton onClick={cancelVariantUnlink}>cancelar</CustomButton>
                        <CustomButton isLoading={loadingUnlink} onClick={handleVariantUnlinkConfirm}>confirmar</CustomButton>
                    </>
                )}
                {!isVariantUnlinking && (
                    <Button form={entityConfig[entityType].formId} className="flex items-center gap-2" disabled={loading}>
                        {loading && <Loader className="animate-spin" /> || <Check />}
                        {<span>Guardar {entityResolved}</span>}
                    </Button>
                )}
            </div>
        </>
    )
}


export default EditForm