"use client"

import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { HandCoins } from "lucide-react"

type Props = {
  isInDebt: boolean
  id: string
}

function UpdateCustomerDebtButton({ isInDebt , id }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)
  
  const handleClick = () => {
    setOpen("update-customer-debt", id)
  }

  return (
    <Button variant={"ghost"} className="p-0 aspect-square group" onClick={handleClick} disabled={!isInDebt}>
      <HandCoins className="p-0 text-muted-foreground group-hover:text-green-400 aspect-square" />
    </Button>
  )
}
export default UpdateCustomerDebtButton