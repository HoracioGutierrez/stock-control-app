"use client"
import { getAllOrders } from "@/actions/getAllOrders"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"
import { IconReceiptRefund } from "@tabler/icons-react"
import { Eye } from "lucide-react"

type Props = {
  data: any[]
}

function OrdersTable({ data }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="orders"
      filterColumn="nombre"
      filterKey="name"
      manualFetch={true}
      manualCallback={getAllOrders}
      dateFilter
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Cancelar orden / reembolso" dialogType="cancel-order" data={rowData.id}>
              <IconReceiptRefund />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles de la compra" href={`/sales/${rowData.id}`}>
              <Eye />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default OrdersTable