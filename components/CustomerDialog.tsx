"use client"

import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import DeleteCustomerConfirmationForm from "./DeleteCustomerConfirmationForm"
import { cn } from "@/lib/utils"
import EditFormContainer from "./EditFormContainer"

function CustomerDialog() {


    const { isOpen, handleClose, type, customer } = useCustomerDialogStore((state: any) => state)

    const entityProps = {
        entity: "customer",
        barcode: undefined,
        customerId: customer.id,
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className={cn((type === "new" || type === "edit" || type === "delete") && "max-w-screen-lg")}>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {type === "delete" && "Bloquear Cliente"}
                        {type === "activate" && "Habilitar Cliente"}
                    </DialogTitle>
                </DialogHeader>
                {(type === "delete" || type === "activate") && <DeleteCustomerConfirmationForm id={customer} type={type} />}
                {type === "edit" && <EditFormContainer {...entityProps} />}

            </DialogContent>
        </Dialog>
    )
}

export default CustomerDialog