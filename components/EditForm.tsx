"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Loader, PlusCircle } from "lucide-react"
import { FormEditProps } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import ProductVariantForm from "./ProductVariantForm"
import { Key } from "react"



function EditForm({ entity, loading, register, errors, data, formForVariant, formForName, formForDetails, entityConfig, conditionalEntity, isVariant, handleMainNameChange, handleAddVariant, fields }: FormEditProps) {

    console.log(entityConfig[entity].formId)
    return (
        <>
            <div className="self-stretch">
                <Card className="bg-accent h-full">
                    <CardHeader>
                        <CardTitle>
                            Detalles de {conditionalEntity}
                        </CardTitle>
                        <CardDescription>
                            Estos detalles son obligatorios para que el
                            {conditionalEntity}
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
                </Card>
            </div>
            <div>
                <Card className="bg-accent">
                    <CardHeader>
                        <CardTitle>Detalles Adicionales</CardTitle>
                        <CardDescription>
                            Estos datos son opcionales para crear el
                            {conditionalEntity}.
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
            <div className="col-span-full">
                <Card className="bg-accent">
                    <CardHeader>
                        <CardTitle>Variantes</CardTitle>
                        <CardDescription>Variantes de {conditionalEntity}.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-end">
                            {Object.keys(formForVariant).map((key, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <div key={index} className="grid gap-2">
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
                        {fields.length >= 0 &&(
                            <Button type="button" className="flex items-center gap-2" variant={"outline"} onClick={handleAddVariant}>
                                <PlusCircle />
                                Agregar Variante
                            </Button>
                        )}
                    </CardContent>
                </Card>
                <Button form={entityConfig[entity].formId} className="flex items-center gap-2 mx-auto mt-8" disabled={loading}>
                    {loading && <Loader className="animate-spin" />}
                    {<span>Guardar {conditionalEntity}</span>}
                </Button>
            </div >
        </>
    )
}


export default EditForm