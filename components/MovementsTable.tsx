"use client"

import CustomDataTable from "./CustomDataTable"
import { Button } from "./ui/button"

type MovementsTableProps = {
  data: any
}

function MovementsTable({ data }: MovementsTableProps) {
  return (
    <CustomDataTable
      data={data}
      type="history"
      filterColumn="tipo de movimiento"
      filterKey="actionType"
      actions={(rowData: any) => {
        {/* <DeleteProductButton active={row.original.active} barcode={row.original.barcode} />
                          <EditProductButton barcode={row.original.barcode} />
                          {!row.original.isVariant && <EditVariantButton barcode={row.original.barcode} />} */}
        return (
          <>
            <Button>test</Button>
          </>
        )
      }}
    />
  )
}
export default MovementsTable