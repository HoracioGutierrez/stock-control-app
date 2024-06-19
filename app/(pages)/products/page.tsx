import CreateProductButton from "@/components/CreateProductButton"
import ProductsTable from "@/components/NewProductsTable"
import { getAllProducts } from "@/actions/getAllProducts"
import PageHeader from "@/components/layout/PageHeader"
import ProductDialog from "@/components/ProductDialog"
import { auth } from "@/auth"

async function ProductsPage() {

  const session = await auth()
  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <PageHeader title="Productos" actions={<CreateProductButton />} />
      {data.length == 0 && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay productos creados todavía</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a vender en cuanto tengas al menos un producto en tu inventario</p>
            <CreateProductButton />
          </div>
        </div>
      )}
      {data.length > 0 && <ProductsTable data={data} />}
      <ProductDialog userId={session?.user.id as string} />
    </>
  )
}
export default ProductsPage