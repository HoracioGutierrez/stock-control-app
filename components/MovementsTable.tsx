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
    />
  )
}
export default MovementsTable