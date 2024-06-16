"use client"
import { TableCell, TableRow } from "./ui/table"
import { Input } from "./ui/input"
import { ProductVariantFormProps } from "@/lib/types"

function ProductVariantForm({ index, register, error, isLoading }: ProductVariantFormProps) {

  return (
    <TableRow>
      <TableCell>
        <div className="grid gap-2">
          <Input type="text" placeholder="Nombre" {...register(`variants.${index}.name`)} disabled={isLoading} />
          {error && error.name && <p className="text-red-500">{error.name.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="grid gap-2">
          <Input type="number" placeholder="Precio" {...register(`variants.${index}.price`)} disabled={isLoading} />
          {error && error.price && <p className="text-red-500">{error.price.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="grid gap-2">
          <Input type="number" placeholder="Stock" {...register(`variants.${index}.stock`)} disabled={isLoading} />
          {error && error.stock && <p className="text-red-500">{error.stock.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="grid gap-2">
          <Input type="text" placeholder="Código de barras" {...register(`variants.${index}.barcode`)} disabled={isLoading} />
          {error && error.barcode && <p className="text-red-500">{error.barcode.message}</p>}
        </div>
      </TableCell>
    </TableRow>
  )
}
export default ProductVariantForm