import ProductsTable from "@/components/NewProductsTable"
import { getAllProducts } from "@/actions/getAllProducts"
import PageHeader from "@/components/layout/PageHeader"
import ProductDialog from "@/components/ProductDialog"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import { Barcode, Edit2Icon, PackagePlus } from "lucide-react"

async function ProductsPage() {

  const session = await auth()
  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <PageHeader title="Productos" goBack icon={<Barcode className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} actions={
        <>
          <CustomButton className="p-2 group" tooltip="Edita precio de productos" dialogType="edit-prices" variant="ghost" icon={<Edit2Icon className="group-hover:text-green-500" />}>
            <span className="md:block hidden">Editar Precios</span>
          </CustomButton>
          <CustomButton className="p-2 group" tooltip="Crear producto" dialogType="new-product" variant="ghost" icon={<PackagePlus className="group-hover:text-green-500" />}>
            <span className="md:block hidden">Crear Producto</span>
          </CustomButton>
        </>
      } />
      <ProductsTable data={data} isAdmin={session?.user.isAdmin} />
      <ProductDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProductsPage