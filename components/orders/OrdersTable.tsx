"use client"
import { getAllOrders } from "@/actions/getAllOrders"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"
import { IconReceiptRefund } from "@tabler/icons-react"

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
        console.log(rowData)
        return (
          <>
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Cancelar orden / reembolso" dialogType="cancel-order" data={rowData.id}>
              <IconReceiptRefund />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default OrdersTable