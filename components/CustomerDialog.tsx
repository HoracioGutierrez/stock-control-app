"use client"

import DeleteCustomerConfirmationForm from "./DeleteCustomerConfirmationForm"
import EditFormContainer from "./EditFormContainer"
import NewCustomerForm from "./NewCustomerForm"
import CustomDialog from "./CustomDialog"
import { useDialogStore } from "@/stores/generalDialog"
import { useSession } from "next-auth/react"
import UpdateCustomerDebtForm from "./customer/UpdateCustomerDebtForm"


function CustomerDialog() {
    const { data: session } = useSession()
    const userId = session?.user?.id

    const { type, id } = useDialogStore((state: any) => state)

    const config: Record<string, { title: string, fullWidth?: boolean }> = {
        "create-customer": {
            title: "Nuevo Cliente",
            fullWidth: true
        },
        "edit-customer": {
            title: "Editar Cliente",
            fullWidth: true
        },
        "delete-customer": {
            title: "Bloquear Cliente",
            fullWidth: false
        },
        "activate-customer": {
            title: "Habilitar Cliente",
            fullWidth: false
        },
        "update-customer-debt": {
            title: "Saldar deuda",
            fullWidth: false
        }
    }

    const entityProps = {
        entityType: "customer",
        entityId: id,
        userId,
        type,
        hasDetails: true,
        hasVariants: false
    }

    return (
        <>
            <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
                {type === "create-customer" && <NewCustomerForm />}
                {type === "edit-customer" && <EditFormContainer {...entityProps} />}
                {type === "delete-customer" && <DeleteCustomerConfirmationForm {...entityProps} type={type} />}
                {type === "activate-customer" && <DeleteCustomerConfirmationForm {...entityProps} type={type} />}
                {type === "update-customer-debt" && <UpdateCustomerDebtForm userId={userId as string} type={type} />}
            </CustomDialog>
        </>
    )
}

export default CustomerDialog