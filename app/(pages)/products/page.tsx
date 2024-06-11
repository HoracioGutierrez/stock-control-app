import { getAllProducts } from "@/actions/getAllProducts"
import PageTitle from "@/components/PageTitle"
import ProductsTable from "@/components/ProductsTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function ProductsPage() {

  const { data, error } = await getAllProducts()

  if (error) return <p>Error al obtener los productos</p>

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Productos" />
        <Button asChild>
          <Link href="/products/new">
            Crear producto
          </Link>
        </Button>
      </div>
      {data.length === 0 && (
        <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
          <div className="max-w-sm text-center">
            <p className="font-bold text-xl">No hay productos creados todavía</p>
            <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a vender en cuanto tengas al menos un producto en tu inventario</p>
            <Button asChild>
              <Link href="/products/new">
                Crear producto
              </Link>
            </Button>
          </div>
        </div>
      )}
      <ProductsTable data={data} />
    </>
  )
}
export default ProductsPage