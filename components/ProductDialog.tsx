"use client"

import NewProductForm from "./NewProductForm"
import { useSession } from "next-auth/react"
import DeleteProductConfirmationForm from "./DeleteProductConfirmationForm"
import EditProductVariantsForm from "./EditProductVariantsForm"
import EditFormContainer from "./EditFormContainer"
import CustomDialog from "./CustomDialog"
import { useDialogStore } from "@/stores/generalDialog"
import EditPricesForm from "./products/EditPricesForm"
import { useState } from "react"

type ProductDialogProps = {
  userId: string
}

function ProductDialog({ userId }: ProductDialogProps) {

  const { setOpen, type, id } = useDialogStore((state: any) => state)
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)

  const session = useSession()
  const entityType = "product"
  const entityProps = { entityType, barcode: id, hasDetails: true }
  const config: Record<string, { title: string, fullWidth?: boolean }> = {
    "new-product": {
      title: "Nuevo Producto",
      fullWidth: true
    },
    "edit-product": {
      title: "Editar Producto",
      fullWidth: true
    },
    "delete-product": {
      title: "Eliminar Producto",
      fullWidth: false
    },
    "activate-product": {
      title: "Activar Producto",
      fullWidth: false
    },
    "variant": {
      title: "Editar Productos",
      fullWidth: true
    },
    "edit-prices": {
      title: "Editar precios",
      fullWidth: isFullWidth
    }
  }

  return (
    <>
      <CustomDialog title={type ? config[type].title : "Custom Dialog"} fullWidth={type ? config[type].fullWidth : false} >
        {type === "new-product" && <NewProductForm userId={session?.data?.user.id as string} />}
        {(type === "delete-product" || type === "activate-product") && <DeleteProductConfirmationForm userId={session?.data?.user.id as string} barcode={id} type={type} />}
        {type === "edit-product" && <EditFormContainer {...entityProps} userId={session?.data?.user.id as string} />}
        {type === "variant" && <EditProductVariantsForm barcode={id} userId={session?.data?.user.id as string} />}
        {type === "edit-prices" && <EditPricesForm setIsFullWidth={setIsFullWidth} userId={session?.data?.user.id as string} />}
      </CustomDialog>
    </>
  )
}
export default ProductDialog