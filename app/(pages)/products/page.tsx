import CreateProductButton from "@/components/CreateProductButton"
import ProductsTable from "@/components/NewProductsTable"
import { getAllProducts } from "@/actions/getAllProducts"
import PageHeader from "@/components/layout/PageHeader"
import ProductDialog from "@/components/ProductDialog"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import { Edit2Icon } from "lucide-react"

async function ProductsPage() {

  const session = await auth()
  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <PageHeader title="Productos" actions={
        <>
          <CustomButton
            icon={<Edit2Icon />}
            tooltip="Edita precio de productos"
            dialogType="edit-prices"
          >
            editar precios
          </CustomButton>
          <CreateProductButton />
        </>
      } />
      {data.length == 0 && (
        <div className="place-items-center border-slate-400 grid border border-dashed rounded grow">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay productos creados todavía</p>
            <p className="mb-6 text-muted-foreground text-sm">Podrás comenzar a vender en cuanto tengas al menos un producto en tu inventario</p>
            <CreateProductButton />
          </div>
        </div>
      )}
      {data.length > 0 && <ProductsTable data={data} isAdmin={session?.user.isAdmin} />}
      <ProductDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProductsPage