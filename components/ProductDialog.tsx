"use client"

import { useProductDialogStore } from "@/stores/productDialogStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import NewProductForm from "./NewProductForm"
import { useSession } from "next-auth/react"
import DeleteProductConfirmationForm from "./DeleteProductConfirmationForm"
import { cn } from "@/lib/utils"
import EditProductForm from "./EditProductForm"
import EditProductVariantsForm from "./EditProductVariantsForm"

function ProductDialog() {

  const { isOpen, close, type, barcode } = useProductDialogStore((state: any) => state)
  const session = useSession()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={cn((type === "new" || type === "edit" || type === "variant") && "max-w-screen-lg max-h-[calc(100dvh_-_4rem)] overflow-auto scrollbar-default")}>  
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
        {(type === "delete" || type === "activate") && <DeleteProductConfirmationForm userId={session?.data?.user.id as string} barcode={barcode} type={type} />}
        {type === "edit" && <EditProductForm barcode={barcode} userId={session?.data?.user.id as string} />}
        {type === "variant" && <EditProductVariantsForm barcode={barcode} userId={session?.data?.user.id as string} />}
      </DialogContent>
    </Dialog>
  )
}
export default ProductDialog