"use client"

import { getAllProducts } from "@/actions/getAllProducts"
import CustomDataTable from "./CustomDataTable"
import EditButton from "./EditButton"
import EditVariantButton from "./EditVariantButton"
import CustomButton from "./layout/CustomButton"
import { Edit, ListTreeIcon, Trash2, UndoDot } from "lucide-react"

type ProductsTableProps = {
  data: any
  isAdmin?: boolean
}

function ProductsTable({ data, isAdmin }: ProductsTableProps) {
  return (
    <CustomDataTable
      data={data}
      type="products"
      filterColumn="nombre"
      filterKey="name"
      manualFetch={true}
      manualCallback={getAllProducts}
      actions={(rowData: any) => {
        return (
          <>
            {isAdmin && (
              <CustomButton tooltip={rowData.active ? "Borrar producto" : "Reactivar producto"} data={rowData.id} variant="ghost" className="aspect-square p-0 group" dialogType={rowData.active ? "delete-product" : "activate-product"} >
                {rowData.active && <Trash2 className="p-0 aspect-square group-hover:text-red-400" />}
                {!rowData.active && <UndoDot className="p-0 aspect-square group-hover:text-green-400" />}
              </CustomButton>
            )}
            <CustomButton tooltip="Editar producto" data={rowData.barcode} variant="ghost" className="aspect-square p-0 group" dialogType="edit-product">
              <Edit className="p-0 aspect-square group-hover:text-yellow-400" />
            </CustomButton>
            <CustomButton tooltip="Agregar variante" data={rowData.barcode} variant="ghost" className="aspect-square p-0 group" dialogType="variant">
              <ListTreeIcon className="p-0 aspect-square group-hover:text-yellow-400" />
            </CustomButton>
            {/*  {rowData.isVariant && <EditButton barcode={rowData.barcode} entity="product" />} */}
            {/*  {!rowData.isVariant && <EditVariantButton barcode={rowData.barcode} />} */}
          </>
        )
      }}
    />
  )
}

export default ProductsTable