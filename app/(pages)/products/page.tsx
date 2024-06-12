import { getAllProducts } from "@/actions/getAllProducts"
import CreateProductButton from "@/components/CreateProductButton"
import PageTitle from "@/components/PageTitle"
import ProductDialog from "@/components/ProductDialog"
import ProductsTable from "@/components/ProductsTable"

async function ProductsPage() {

  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Productos" />
        <CreateProductButton />
      </div>
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
      <ProductDialog />
    </>
  )
}
export default ProductsPage