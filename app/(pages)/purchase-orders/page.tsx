import { getAllPurchaseOrders } from "@/actions/getAllPurchaseOrders"
import CustomDataTable from "@/components/CustomDataTable"
import PageHeader from "@/components/layout/PageHeader"
import PurchaseOrderPageTable from "@/components/purchaseOrders/PurchaseOrderPageTable"

async function PurchaseOrdersPage() {

  const { data, error } = await getAllPurchaseOrders()

  return (
    <>
      <PageHeader title="Ordenes de Compras" />
      <PurchaseOrderPageTable data={data} />
    </>
  )
}
export default PurchaseOrdersPage