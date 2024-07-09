"use client"

import CustomDataTable from "./CustomDataTable"

type MovementsTableProps = {
  data: any
}

function MovementsTable({ data }: MovementsTableProps) {
  return (
    <CustomDataTable
      data={data ? data : []}
      type="history"
      filterColumn="nombre"
      filterKey="actionType"
    />
  )
}
export default MovementsTable