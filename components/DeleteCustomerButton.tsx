"use client"

import { useCustomerDialogStore } from "@/stores/useCustomerDialogStore"
import { Button } from "./ui/button"
import { UserRoundCheck, Ban } from "lucide-react"
import { DeleteCustomerButtonProps } from "@/lib/types"


const DeleteCustomerButton = ({ active, id }: DeleteCustomerButtonProps) => {

    const { handleOpen } = useCustomerDialogStore((state: any) => state)

    const handleClick = () => {
        handleOpen(true, active ? "delete" : "activate", id)
    }

    return (
        <Button variant={"outline"} className="aspect-square p-0" onClick={handleClick}>
            {active
                ? <Ban className="aspect-square p-0" />
                : <UserRoundCheck className="aspect-square p-0" />}
        </Button>
    )
}

export default DeleteCustomerButton