"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Check, Link, Loader, PlusCircle, SaveIcon, X } from "lucide-react"
import { FormEditProps } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import ProductVariantForm from "./ProductVariantForm"
import { Key, useState } from "react"
import CustomButton from "./layout/CustomButton"
import { editById } from "@/actions/editById"
import { toast } from "./ui/use-toast"
import { IconDeviceFloppy, IconPlugConnected, IconPlugConnectedX } from "@tabler/icons-react"
import LinkProductToVariantTable from "./products/LinkProductToVariantTable"
import { RadioGroup } from "@radix-ui/react-dropdown-menu"
import { useDialogStore } from "@/stores/generalDialog"



function EditForm({ entityType, loading, register, errors, data, formForVariant, formForName, formForDetails, entityConfig, entityResolved, isVariant, handleMainNameChange, handleAddVariant, fields, hasVariants = false, hasDetails = false, userId , isDirty }: FormEditProps) {

    const [isVariantUnlinking, setIsVariantUnlinking] = useState<boolean>(false)
    const [isVariantLinking, setIsVariantLinking] = useState<boolean>(false)
    const [loadingUnlink, setLoadingUnlink] = useState<boolean>(false)
    const [productId, setProductId] = useState<string>("")
    const [loadingLink, setLoadingLink] = useState<boolean>(false)
    const { setClose } = useDialogStore((state: any) => state)

    const handleVariantUnlink = () => {
        setIsVariantUnlinking(true)
    }

    const cancelVariantUnlink = () => {
        setIsVariantUnlinking(false)
    }

    const handleVariantUnlinkConfirm = () => {
        setLoadingUnlink(true)
        editById(entityType, data, { productId: null, isVariant: false }, userId)
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
                    description: "Error al eliminar la variante, intente nuevamente o contacte al desarrollador."
                })
            })
            .finally(() => {
                setLoadingUnlink(false)
                setIsVariantUnlinking(false)
            })
    }

    const handleVariantLink = () => {
        setIsVariantLinking(true)
    }

    const handleConfirmLinkVariant = () => {
        setLoadingLink(true)
        Promise.all([editById("product", data, { productId, isVariant: true }, userId), editById("product", productId, { hasVariants: true }, userId)])
            .then((data) => {
                if (data[0]?.error || data[1]?.error) {
                    throw new Error("Error al vincular la variante")
                }
                toast({
                    title: "Variante vinculada correctamente",
                    description: "La variante se ha vinculado correctamente en la base de datos",
                })
            })
            .catch((error) => {
                if (error instanceof Error) {
                    return toast({
                        variant: "destructive",
                        title: "Error al vincular la variante",
                        description: error.message
                    })
                }
                toast({
                    variant: "destructive",
                    title: "Error al vincular la variante",
                    description: "Error al vincular la variante, intente nuevamente o contacte al desarrollador."
                })
            })
            .finally(() => {
                setLoadingLink(false)
                setIsVariantLinking(false)
                setClose()
            })

    }

    return (
        <>
            {!isVariantUnlinking && !isVariantLinking && (
                <div className="flex justify-center items-center">
                    {hasDetails === false &&
                        <div className="gap-4 grid grid-cols-1 py-4">
                            <Card className="bg-primary-foreground p-4">
                                <CardHeader>
                                    <CardTitle>
                                        Detalles de {entityResolved}
                                    </CardTitle>
                                    <CardDescription>
                                        Estos detalles son obligatorios para que la {entityResolved} pueda crearse correctamente.
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
                                Estos detalles son obligatorios para que el {entityResolved} pueda crearse correctamente.
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

            {(hasDetails && !isVariantUnlinking && !isVariantLinking) && (
                <div>
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <CardTitle>Detalles Adicionales</CardTitle>
                            <CardDescription>
                                Estos datos son opcionales para crear el {entityResolved}.
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

            {(hasVariants && !isVariantUnlinking && !isVariantLinking) && (
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
                    <p className="text-muted-foreground">Estás a punto de eliminar este producto como variante de otro. El producto seguira estando en el inventario pero no formara parte de las variantes de otro producto. ¿Está seguro de que desea continuar?</p>
                </div>
            )}

            {isVariantLinking && (
                <div className="col-span-full">
                    <p className="text-muted-foreground">Estás a punto de vincular este producto como variante de otro. Para hacerlo, debes seleccionar el producto que deseas vincular de la siguiente tabla :</p>
                    <RadioGroup>
                        <LinkProductToVariantTable userId={userId as string} setProductId={setProductId} />
                    </RadioGroup>
                </div>
            )}

            <div className="grid grid-cols-1 col-span-full">
                <div className="flex justify-center gap-2">
                    {(isVariant && !isVariantUnlinking && entityType === "product") &&
                        <CustomButton onClick={handleVariantUnlink}>{
                            <div className="flex items-center group">
                                <IconPlugConnectedX className="group-hover:text-red-500 text-muted-foreground aspect-square size-8" />
                                <span className="text-muted-foreground">Desvincular variante</span>
                            </div>
                        }</CustomButton>
                    }
                    {isVariantUnlinking && (
                        <>
                            <CustomButton onClick={cancelVariantUnlink}>
                                <div className="flex items-center group">
                                    <X className="group-hover:text-red-500 text-muted-foreground aspect-square size-6" />
                                    <span className="text-muted-foreground">Cancelar</span>
                                </div>
                            </CustomButton>
                            <CustomButton isLoading={loadingUnlink} onClick={handleVariantUnlinkConfirm}>
                                <div className="flex items-center group">
                                    <Check className="group-hover:text-green-500 text-muted-foreground aspect-square size-6" />
                                    <span className="text-muted-foreground">Confirmar</span>
                                </div>
                            </CustomButton>
                        </>
                    )}
                    {!isVariant && entityType === "product" && (
                        <>
                            <CustomButton onClick={isVariantLinking ? handleConfirmLinkVariant : handleVariantLink} disabled={loadingLink}>
                                <div className="flex items-center group">
                                    {loadingLink ? <Loader className="animate-spin" /> : <IconPlugConnected className="group-hover:text-green-500 text-muted-foreground aspect-square size-8" />}
                                    <span className="sm:block hidden text-muted-foreground">{isVariantLinking ? "Confirmar" : "Vincular variante"}</span>
                                </div>
                            </CustomButton>
                            {isVariantLinking && (
                                <CustomButton onClick={() => { setIsVariantLinking(false) }} className="flex items-center group" disabled={loading}>
                                    <div className="flex items-center group">
                                        <X className="group-hover:text-red-500 text-muted-foreground aspect-square size-8" />
                                        <span className="text-muted-foreground">Cancelar</span>
                                    </div>
                                </CustomButton>
                            )}
                        </>
                    )}
                    {!isVariantUnlinking && !isVariantLinking && (
                        <Button form={entityConfig[entityType].formId} className="flex items-center max-sm:px-2 group" disabled={loading || !isDirty}>
                            {loading && <Loader className="animate-spin" /> || <IconDeviceFloppy className="group-hover:text-green-500 text-muted-foreground aspect-square size-8" />}
                            {<span className="sm:block hidden text-muted-foreground">Guardar {entityResolved}</span>}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}


export default EditForm