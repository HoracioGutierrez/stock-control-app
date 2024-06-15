"use client"

import CustomDataTable from "./CustomDataTable"
import DeleteProductButton from "./DeleteProductButton"
import EditProductButton from "./EditProductButton"
import EditVariantButton from "./EditVariantButton"
import { Button } from "./ui/button"

type ProductsTableProps = {
  data: any
}

function ProductsTable({ data }: ProductsTableProps) {
  return (
    <CustomDataTable
      data={data}
      type="products"
      filterColumn="nombre"
      filterKey="name"
      actions={(rowData: any) => {
        return (
          <>
            <DeleteProductButton active={rowData.active} barcode={rowData.barcode} />
            <EditProductButton barcode={rowData.barcode} />
            {!rowData.isVariant && <EditVariantButton barcode={rowData.barcode} />}
          </>
        )
      }}
    />
  )
}

export default ProductsTable