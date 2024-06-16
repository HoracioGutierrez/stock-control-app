"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Check, Loader } from "lucide-react"
import { entityConfig, formVariants } from "@/lib/formConfig"


function EditForm({ entity, loading, register, errors }: any, { data }: any) {
    const variant = formVariants[entity]

    return (
        <>
            <div className="self-stretch">
                <Card className="bg-accent h-full">
                    <CardHeader>
                        <CardTitle>Detalles de {variant.formFor}</CardTitle>
                        <CardDescription>Estos detalles son obligatorios para que el {variant.formFor} pueda crearse correctamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {
                            variant.requiredFormFor.map((input, index) => (
                                <div key={index}>
                                    <Label htmlFor={input}>{variant.requieredFormLabel[index]}</Label>
                                    <Input type={variant.requiredVariantInput[index]} placeholder={variant.requieredFormLabel[index]} {...register(input, { disabled: loading })} />
                                    {errors[input] && <p className="text-red-500">{errors[input].message}</p>}
                                </div>
                            ))
                        }
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="bg-accent">
                    <CardHeader>
                        <CardTitle>Detalles Adicionales</CardTitle>
                        <CardDescription>Estos datos son opcionales para crear el {variant.formFor}.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {
                            variant.detailsFormFor.map((input, index) => (
                                <div key={index}>
                                    <Label htmlFor={input}>{input}</Label>
                                    <Input type={variant.detailsVariantInput[index]} placeholder={input} {...register(input, { disabled: loading })} />
                                </div>
                            ))
                        }
                    </CardContent>
                </Card>
            </div>
            {data?.variants && (
                <div>
                    <Card className="bg-accent">
                        <CardHeader>
                            <CardTitle>Variantes</CardTitle>
                            <CardDescription>Estos datos son opcionales para crear el {variant.formFor}.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {
                                variant.variantsFormFor?.map((input, index) => (
                                    <div key={index}>
                                        <Label htmlFor={input}>{input}</Label>
                                        <Input type={variant?.variantsVariantInput?.[index]} placeholder={input} {...register(input, { disabled: loading })} />
                                        {errors[input] && <p className="text-red-500">{errors[input].message}</p>}
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
            )}

            <Button form={entityConfig[entity].formId} className="flex items-center gap-2 mx-auto mt-8" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : <Check />}
                <span>Guardar {variant.formFor}</span>
            </Button>
        </>
    )
}


export default EditForm