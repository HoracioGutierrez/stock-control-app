"use client"

import DeleteCustomerConfirmationForm from "./DeleteCustomerConfirmationForm"
import EditFormContainer from "./EditFormContainer"
import NewCustomerForm from "./NewCustomerForm"
import CustomDialog from "./CustomDialog"
import { useDialogStore } from "@/stores/generalDialog"
import { useSession } from "next-auth/react"
import { DeleteCustomerProps } from "@/lib/types"




function CustomerDialog() {
    const { data: session } = useSession()
    const userId = session?.user?.id

    const { type, id } = useDialogStore((state: any) => state)

    const entityProps = {
        entityType: "customer",
        entityId: id,
        userId,
        type,
        hasVariants: false,
    } as DeleteCustomerProps

    return (
        <CustomDialog fullWidth title={type === "create-customer" ? "Crear Cliente" : "Editar Cliente"}>
            {type === "create-customer" && <NewCustomerForm />}
            {type === "edit-customer" && <EditFormContainer {...entityProps} />}
            {type === "delete-customer" && <DeleteCustomerConfirmationForm {...entityProps} />}
        </CustomDialog>
    )
}

export default CustomerDialog