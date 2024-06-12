import { Loader } from "lucide-react"
import { Button } from "./ui/button"
import { useNewProductStore } from "@/stores/newProductStore"

function NewClientButton() {

  /*   const isLoading = useNewProductStore((state: any) => state.isLoading) */

    return (
        <Button form="new-client-form" /* disabled={isLoading} */ className="flex items-center gap-2">
           {/*  {isLoading && <Loader className="animate-spin" />} */}
            <span>Guardar Cliente</span>
        </Button>
    )
}

export default NewClientButton