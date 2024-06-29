"use client"

import { Eye } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"

type Props = {
  data: any[]
}

function PurchaseOrderTable({ data }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="purchase-orders"
      dateFilter
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles de la compra" href={`/purchase-orders/${rowData.id}`}>
              <Eye />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default PurchaseOrderTable