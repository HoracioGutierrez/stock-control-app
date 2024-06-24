"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Check, Loader, PlusCircle } from "lucide-react"
import { FormEditProps } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import ProductVariantForm from "./ProductVariantForm"
import { Key } from "react"



function EditForm({ entityType, loading, register, errors, data, formForVariant, formForName, formForDetails, entityConfig, entityResolved, isVariant, handleMainNameChange, handleAddVariant, fields, hasVariants = false, hasDetails = false }: FormEditProps) {

    return (
        <>
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
                    <CardContent className="grid gap-4">
                        {Object.keys(formForName).map((key, index) => {
                            return (
                                <div className="grid gap-2" key={index}>
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

            {
                hasDetails &&
                <div>
                    <Card className="bg-primary-foreground">
                        <CardHeader>
                            <CardTitle>Detalles Adicionales</CardTitle>
                            <CardDescription>
                                Estos datos son opcionales para crear el
                                {entityResolved}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                {Object.keys(formForDetails).map((key, index) => {
                                    return (
                                        <div className="grid gap-2" key={index}>
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
            }

            <div className="col-span-full">
                {hasVariants && (
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Variantes</CardTitle>
                            <CardDescription>Variantes de {entityResolved}.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center justify-end">
                                {formForVariant && Object.keys(formForVariant).map((key, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="grid gap-2">
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
                )}
                <Button form={entityConfig[entityType].formId} className="flex items-center gap-2 mx-auto mt-8" disabled={loading}>
                    {loading && <Loader className="animate-spin" /> || <Check />}
                    {<span>Guardar {entityResolved}</span>}
                </Button>
            </div >
        </>
    )
}


export default EditForm