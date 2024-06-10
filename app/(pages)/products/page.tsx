import { Button } from "@/components/ui/button"

function ProductsPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <div className="grow rounded border border-dashed border-slate-400 grid place-items-center">
        <div className="max-w-sm text-center">
          <p className="font-bold text-xl">No hay productos creados todavía</p>
          <p className="text-sm text-muted-foreground mb-6">Podrás comenzar a vender en cuanto tengas al menos un producto en tu inventario</p>
          <Button>Crear producto</Button>
        </div>
      </div>
    </>
  )
}
export default ProductsPage