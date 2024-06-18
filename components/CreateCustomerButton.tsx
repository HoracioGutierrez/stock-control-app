"use client"
import { UserRoundPlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {}
function CreateCustomerButton({ }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("create-customer")
  }

  return (
    <Button className="flex items-center gap-2" onClick={handleClick}>
      <UserRoundPlusIcon />
      <span>Crear Cliente</span>
    </Button>
  )
}
export default CreateCustomerButton