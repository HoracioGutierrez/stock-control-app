"use client"
import CustomDataTable from "../CustomDataTable"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


type BalanceTableProps = {
  data: any[]
}

function BalanceTable({ data }: BalanceTableProps) {

  return (
    <CustomDataTable
      data={data}
      type="balance"
      pageSize={10}
      filterColumn="operationType"
      filterKey="operationType"
    />
  )
}

export default BalanceTable