"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"

type Props = {}
function CreateCashRegisterButton({ }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("create-cash-register")
  }

  return (
    <Button className="flex items-center gap-2 text-white dark:text-primary-foreground" onClick={handleClick}>
      <PlusIcon />
      <span>Crear Caja</span>
    </Button>
  )
}
export default CreateCashRegisterButton