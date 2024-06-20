"use client"

import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import DeleteCustomerConfirmationForm from "./DeleteCustomerConfirmationForm"
import { cn } from "@/lib/utils"
import EditFormContainer from "./EditFormContainer"
import { useState } from "react"
import NewCustomerForm from "./NewCustomerForm"
import CustomDialog from "./CustomDialog"
import { useDialogStore } from "@/stores/generalDialog"


type CustomerDialogProps = {
}

function CustomerDialog({ }: CustomerDialogProps) {

    const { type, id } = useDialogStore((state: any) => state)

    const entityProps = {
        entity: "customer",
        barcode: undefined,
        customerId: id,
        hasVariants: false,
    }

    return (
        <CustomDialog fullWidth title={type === "create-customer" ? "Crear Cliente" : "Editar Cliente"}>
            {type === "create-customer" && <NewCustomerForm />}
            {type === "edit-customer" && <EditFormContainer {...entityProps} />}
            {type === "delete-customer" && <DeleteCustomerConfirmationForm id={id} type={type} />}
        </CustomDialog>
    )
}

export default CustomerDialog