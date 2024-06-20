"use client"

import DeleteCustomerConfirmationForm from "./DeleteCustomerConfirmationForm"
import EditFormContainer from "./EditFormContainer"
import NewCustomerForm from "./NewCustomerForm"
import CustomDialog from "./CustomDialog"
import { useDialogStore } from "@/stores/generalDialog"




function CustomerDialog() {

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