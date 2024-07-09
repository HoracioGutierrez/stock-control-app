import { getAllPurchaseOrders } from "@/actions/getAllPurchaseOrders"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import PurchaseOrderPageTable from "@/components/purchaseOrders/PurchaseOrderPageTable"
import { IconTruckLoading } from "@tabler/icons-react"

async function PurchaseOrdersPage() {

  const { data, error } = await getAllPurchaseOrders()

  return (
    <>
      <PageHeader title="Ordenes de Compras" goBack icon={<IconTruckLoading className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      <PurchaseOrderPageTable data={data} />
    </>
  )
}
export default PurchaseOrdersPage