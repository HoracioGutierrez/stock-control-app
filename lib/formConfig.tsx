import { customerSchema, productSchema } from "./schemas"
import { FormSchemaVariants } from "@/lib/types"

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

export const formNamesVariants: {
    [key: string]: FormSchemaVariants
} = {
    product: {
        name: {
            name: "name",
            label: "Nombre",
            inputType: "text"
        },
        description: {
            name: "description",
            label: "Descripción",
            inputType: "text"
        }
    },
    customer: {
        name: {
            name: "name",
            label: "Nombre",
            inputType: "text"
        },
        lastName: {
            name: "lastName",
            label: "Apellidos",
            inputType: "text"
        }
    }
}

export const formDetailsVariants: {
    [key: string]: FormSchemaVariants
} = {
    product: {
        price: {
            name: "price",
            label: "Precio",
            inputType: "number"
        },
        stock: {
            name: "stock",
            label: "Stock",
            inputType: "number"
        },
        barcode: {
            name: "barcode",
            label: "Código de barras",
            inputType: "text"
        },
        variant: {
            name: "variant",
            label: "Variante",
            inputType: "text"
        }
    },
    customer: {
        phone: {
            name: "phone",
            label: "Teléfono",
            inputType: "text"
        },
        email: {
            name: "email",
            label: "Email",
            inputType: "text"
        },
        address: {
            name: "direction",
            label: "Dirección",
            inputType: "text"
        },
        legalName: {
            name: "legalName",
            label: "Legal Name",
            inputType: "text"
        },
        cuitCuil: {
            name: "cuitCuil",
            label: "CUIT/CUIL",
            inputType: "text"
        }
    }
}

export const formVariants: {
    [key: string]: FormSchemaVariants
} = {
    product: {
        variant: {
            name: "variant",
            label: "Variante",
            inputType: "text"
        }
    },
}

