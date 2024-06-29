import ProductsTable from "@/components/NewProductsTable"
import { getAllProducts } from "@/actions/getAllProducts"
import PageHeader from "@/components/layout/PageHeader"
import ProductDialog from "@/components/ProductDialog"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import { Edit2Icon, PackagePlus } from "lucide-react"

async function ProductsPage() {

  const session = await auth()
  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <PageHeader title="Productos" actions={
        <>
          <CustomButton className="group"
            icon={<Edit2Icon className="group-hover:text-green-500" />}
            tooltip="Edita precio de productos"
            dialogType="edit-prices"
          >
            <span className="text-muted-foreground">Editar precios</span>
          </CustomButton>
          <CustomButton className="group"
            icon={<PackagePlus className="group-hover:text-green-500" />}
            tooltip="Crear producto"
            dialogType="new-product"
          >
            <span className="text-muted-foreground">Crear producto</span>
          </CustomButton>
        </>
      } />
      <ProductsTable data={data} isAdmin={session?.user.isAdmin} />
      <ProductDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProductsPage