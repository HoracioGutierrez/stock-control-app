"use client"
import CustomDataTable from "@/components/CustomDataTable"
/* import DeleteProviderButton from "@/components/DeleteProviderButton"
import EditProviderButton from "@/components/EditProviderButton" */
import { Button } from "@/components/ui/button"

type ProvidersTableProps = {
  data: any
}

function ProvidersTable({ data }: ProvidersTableProps) {
  return (
    <CustomDataTable
      data={data}
      type="providers"
      filterColumn="nombre"
      filterKey="name"
      actions={(rowData: any) => {
        return (
          <>
            {/* <DeleteProviderButton active={rowData.active} id={rowData.id} />
            <EditProviderButton barcode={rowData.barcode} /> */}
          </>
        )
      }}
    />
  )
}
export default ProvidersTable