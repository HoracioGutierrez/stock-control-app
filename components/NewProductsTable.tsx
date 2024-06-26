"use client"

import { getAllProducts } from "@/actions/getAllProducts"
import CustomDataTable from "./CustomDataTable"
import DeleteProductButton from "./DeleteProductButton"
import EditButton from "./EditButton"
import EditVariantButton from "./EditVariantButton"
import DeleteResourceButton from "./layout/DeleteResourceButton"
import { Button } from "./ui/button"

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
              <DeleteResourceButton type="product" data={rowData.id} active={rowData.active} tooltip={rowData.active ? "Borrar producto" : "Reactivar producto"} />
            )}
            {rowData.isVariant && <EditButton barcode={rowData.barcode} entity="product" />}
            {!rowData.isVariant && <EditVariantButton barcode={rowData.barcode} />}
          </>
        )
      }}
    />
  )
}

export default ProductsTable