"use client"

import { ShoppingBasket } from "lucide-react"
import { Button } from "../ui/button"
import { useDialogStore } from "@/stores/generalDialog"

type Props = {
  userId: string
}

function NewProviderOrderButton({ userId }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("new-provider-order", userId)
  }

  return (
    <Button variant={"ghost"} className="text-muted-foreground hover:text-yellow-200" onClick={handleClick}>
      <ShoppingBasket />
    </Button>
  )
}
export default NewProviderOrderButton