"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import NewProductForm from "./NewProductForm"
import { useSession } from "next-auth/react"
import DeleteProductConfirmationForm from "./DeleteProductConfirmationForm"
import { cn } from "@/lib/utils"
import EditProductVariantsForm from "./EditProductVariantsForm"
import EditFormContainer from "./EditFormContainer"

function ProductDialog() {

  const { isOpen, close, type, barcode } = useProductDialogStore((state: any) => state)
  const session = useSession()
  const entity = "product"
  const entityProps = { entity, barcode }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={cn((type === "new" || type === "edit" || type === "variant") && "max-w-screen-lg")}>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {type === "new" && "Nuevo Producto"}
            {type === "edit" && "Editar Producto"}
            {type === "delete" && "Eliminar Producto"}
            {type === "activate" && "Activar Producto"}
            {type === "variant" && "Editar Productos"}
          </DialogTitle>
        </DialogHeader>
        {type === "new" && <NewProductForm userId={session?.data?.user.id as string} />}
        {(type === "delete" || type === "activate") && <DeleteProductConfirmationForm barcode={barcode} type={type} />}
        {type === "edit" && <EditFormContainer {...entityProps} />}
        {type === "variant" && <EditProductVariantsForm barcode={barcode} />}
      </DialogContent>
    </Dialog>
  )
}
export default ProductDialog