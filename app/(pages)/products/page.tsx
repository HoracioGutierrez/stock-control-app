import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ProductsPage() {
  return (
    <>
      <PageTitle title="Productos" />
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
    </>
  )
}
export default ProductsPage