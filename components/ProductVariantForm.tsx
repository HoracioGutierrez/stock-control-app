"use client"
import { TableCell, TableRow } from "./ui/table"
import { Input } from "./ui/input"
import { ProductVariantFormProps } from "@/lib/types"
import { Button } from "./ui/button"
import { Loader, Trash2, Unplug } from "lucide-react"

function ProductVariantForm({ index, register, error, isLoading, onRemove, canRemove = true , handleUnlinkVariant , isUnlinking, id }: ProductVariantFormProps) {

  return (
    <TableRow>
      <TableCell>
        <div className="gap-2 grid">
          <Input type="text" placeholder="Nombre" {...register(`variants.${index}.name`)} disabled={isLoading} />
          {error && error.name && <p className="text-red-500">{error.name.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="gap-2 grid">
          <Input type="number" placeholder="Precio" {...register(`variants.${index}.price`)} disabled={isLoading} step="any" />
          {error && error.price && <p className="text-red-500">{error.price.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="gap-2 grid">
          <Input type="number" placeholder="Stock" {...register(`variants.${index}.stock`)} disabled={isLoading} />
          {error && error.stock && <p className="text-red-500">{error.stock.message}</p>}
        </div>
      </TableCell>
      <TableCell>
        <div className="gap-2 grid">
          <Input type="text" placeholder="Código de barras" {...register(`variants.${index}.barcode`)} disabled={isLoading} />
          {error && error.barcode && <p className="text-red-500">{error.barcode.message}</p>}
        </div>
      </TableCell>
      {canRemove ? (
        <TableCell>
          <Button variant={"outline"} className="p-1 aspect-square" onClick={onRemove} type="button">
            <Trash2 />
          </Button>
        </TableCell>
      ) : <TableCell>
        <Button variant={"outline"} className="p-1 aspect-square" onClick={()=>handleUnlinkVariant(index,id)} type="button">
          {isUnlinking ? <Loader className="animate-spin" /> : <Unplug />}
        </Button>
      </TableCell>
      }
    </TableRow>
  )
}
export default ProductVariantForm