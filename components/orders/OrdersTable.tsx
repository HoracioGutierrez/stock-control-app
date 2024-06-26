import { getAllOrders } from "@/actions/getAllOrders"
import CustomDataTable from "../CustomDataTable"

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
            
          </>
        )
      }}
    />
  )
}
export default OrdersTable