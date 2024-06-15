"use client"
import { PlusCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {}
function CreateCashRegisterButton({ }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("create-cash-register")
  }

  return (
    <Button className="flex items-center gap-2" onClick={handleClick}>
      <PlusCircle />
      <span>Crear Caja</span>
    </Button>
  )
}
export default CreateCashRegisterButton