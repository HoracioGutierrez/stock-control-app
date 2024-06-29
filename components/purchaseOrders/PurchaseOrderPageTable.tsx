"use client"

import { Eye } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"

type Props = {
  data: any[]
}

function PurchaseOrderPageTable({ data }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="purchase-orders-provider"
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles de la orden de compra" href={`/purchase-orders/${rowData.id}`}>
              <Eye />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default PurchaseOrderPageTable