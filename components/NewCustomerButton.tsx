import { Button } from "./ui/button"
import { UserRoundCheckIcon } from "lucide-react"


function NewCustomerButton() {


  return (
    <Button form="new-customer-form" className="flex items-center gap-2">
      <UserRoundCheckIcon className="h-6 w-6" />
      <span>Guardar Cliente</span>
    </Button>
  )
}

export default NewCustomerButton