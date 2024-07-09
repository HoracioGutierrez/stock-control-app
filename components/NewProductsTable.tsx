"use client"

import { getAllProducts } from "@/actions/getAllProducts"
import CustomDataTable from "./CustomDataTable"
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
              <CustomButton tooltip={rowData.active ? "Borrar producto" : "Reactivar producto"} data={rowData.id} variant="ghost" className="p-0 aspect-square group" dialogType={rowData.active ? "delete-product" : "activate-product"} >
                {rowData.active && <Trash2 className="group-hover:text-red-400 p-0 aspect-square" />}
                {!rowData.active && <UndoDot className="group-hover:text-green-400 p-0 aspect-square" />}
              </CustomButton>
            )}
            <CustomButton tooltip="Editar producto" data={rowData.barcode} variant="ghost" className="p-0 aspect-square group" dialogType="edit-product">
              <Edit className="group-hover:text-yellow-400 p-0 aspect-square" />
            </CustomButton>
            {rowData.isVariant === false && rowData.hasVariants === true && (
              <CustomButton tooltip="Agregar variante" data={rowData.barcode} variant="ghost" className="p-0 aspect-square group" dialogType="variant">
                <ListTreeIcon className="group-hover:text-yellow-400 p-0 aspect-square" />
              </CustomButton>
            )}
          </>
        )
      }}
    />
  )
}

export default ProductsTable