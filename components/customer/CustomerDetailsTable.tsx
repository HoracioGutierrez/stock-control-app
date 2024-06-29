"use client"

import { Eye } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"

type Props = {
  orders: any[]
}

function CustomerDetailsTable({ orders }: Props) {
  return (
    <CustomDataTable
      data={orders}
      type="customer-orders"
      noFilter
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles de la compra" href={`/sales/${rowData.id}`}>
              <Eye/>
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default CustomerDetailsTable