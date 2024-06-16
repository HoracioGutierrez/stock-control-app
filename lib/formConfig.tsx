import { customerSchema, productSchema } from "./schemas"

export const entityConfig: {
    [key: string]: {
        formId: string
        schema: any
    }
} = {
    customer: {
        formId: "new-customer-form",
        schema: customerSchema
    },
    product: {
        formId: "new-product-form",
        schema: productSchema
    }
}

export const formVariants: {
    [key: string]: {
        formFor: string
        requiredFormFor: [string, string]
        requieredFormLabel: [string, string]
        requiredVariantInput: [string, string]
        detailsFormFor: [string, string, string, string?, string?]
        detailsFormValue: [string, string, string?, string?, string?]
        detailsVariantInput: [string, string, string?, string?, string?]
        variantsFormFor?: [string]
        variantsFormValue?: [string]
        variantsVariantInput?: [string]
    }
} = {
    product: {
        formFor: "producto",
        requiredFormFor: ["name", "description"],
        requieredFormLabel: ["Nombre", "Descripción"],
        requiredVariantInput: ["text", "text"],
        detailsFormFor: ["price", "stock", "barcode"],
        detailsFormValue: ["Precio", "Stock", "Código de barras", "Variantes"],
        detailsVariantInput: ["number", "number", "text"],
        variantsFormFor: ["variants"],
        variantsFormValue: ["Variantes"],
        variantsVariantInput: ["text"]

    },
    customer: {
        formFor: "cliente",
        requiredFormFor: ["name", "lastName"],
        requieredFormLabel: ["Nombre", "Apellidos"],
        requiredVariantInput: ["text", "text"],
        detailsFormFor: ["phone", "email", "address", "legalName", "cuitCuil"],
        detailsFormValue: ["Teléfono", "Email", "Dirección", "Legal Name", "CUIT/CUIL"],
        detailsVariantInput: ["text", "text", "text", "text", "text"],
    }
}