"use client"

import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { Button } from "./ui/button"
import { UserRoundCheck, Ban } from "lucide-react"
import { DeleteCustomerButtonProps } from "@/lib/types"
import { useDialogStore } from "@/stores/generalDialog"


const DeleteCustomerButton = ({ active, id }: DeleteCustomerButtonProps) => {

    //const { handleOpen } = useCustomerDialogStore((state: any) => state)
    const { setOpen } = useDialogStore((state: any) => state)

    const handleClick = () => {
        //handleOpen(true, active ? "delete" : "activate", id)
        setOpen("delete-customer", id)
    }

    return (
        <Button variant={"ghost"} className="aspect-square p-0" onClick={handleClick}>
            {active
                ? <Ban className="aspect-square p-0 text-muted-foreground hover:text-red-400" />
                : <UserRoundCheck className="aspect-square p-0 text-muted-foreground hover:text-green-400" />}
        </Button>
    )
}

export default DeleteCustomerButton