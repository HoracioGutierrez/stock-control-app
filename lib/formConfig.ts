
import { customerSchema, productSchema, providerSchema, cashRegisterSchema, customerDebtSchema } from "./schemas"
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
    },
    provider: {
        formId: "new-provider-form",
        schema: providerSchema
    },
    cashRegister: {
        formId: "new-cash-register-form",
        schema: cashRegisterSchema
    },
    customerDebt : {
        formId: "new-customer-debt-form",
        schema: customerDebtSchema
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
    },
    provider: {
        name: {
            name: "name",
            label: "Nombre",
            inputType: "text"
        },
        lastName: {
            name: "lastName",
            label: "Apellido/s",
            inputType: "text"
        },
        companyName: {
            name: "companyName",
            label: "Nombre de la empresa",
            inputType: "text"
        },
    },
    cashRegister: {
        label: {
            name: "label",
            label: "Nombre de la caja",
            inputType: "text"
        },
        currentAmount: {
            name: "currentAmount",
            label: "Cantidad",
            inputType: "text"
        }
    },
    customerDebt: {
        payAll: {
            name: "payAll",
            label: "Pagar todo",
            inputType: "checkbox"
        },
        manualAmount: {
            name: "manualAmount",
            label: "Monto manual",
            inputType: "number"
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
            label: "Nombre legal/Razón social",
            inputType: "text"
        },
        cuitCuil: {
            name: "cuitCuil",
            label: "CUIT/CUIL",
            inputType: "text"
        }
    },
    provider: {
        address: {
            name: "address",
            label: "Dirección",
            inputType: "text"
        },
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
        name: {
            name: "name",
            label: "Variante",
            inputType: "text"
        },
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
    },
}

export const defaultValue: {
    [key: string]:
    {
        [key: string]: string | number
    }
} = {
    product: {
        name: "",
        description: "",
        price: 0,
        barcode: "",
        stock: 0,
    },
    customer: {
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        legalName: "",
        cuitCuil: "",
    },
    provider: {
        name: "",
        lastName: "",
        companyName: "",
        address: "",
        phone: "",
        email: "",
        cuitCuil: "",
    },
    cashRegister: {
        label: "",
        currentAmount: 0,
    },
    variant: {
        name: "",
        price: 0,
        stock: 0,
        barcode: "",
    }
}