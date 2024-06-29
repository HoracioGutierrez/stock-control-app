"use client"

import { Eye } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"

type Props = {
  data: any[]
}

function PurchaseOrderProductsTable({ data }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="purchase-order-products"
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del producto" href={`/products/${rowData.id}`}>
              <Eye />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default PurchaseOrderProductsTable