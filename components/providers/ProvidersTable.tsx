"use client"
import { getAllProviders } from "@/actions/getAllProviders"
import CustomDataTable from "@/components/CustomDataTable"
/* import DeleteProviderButton from "@/components/DeleteProviderButton"
import EditProviderButton from "@/components/EditProviderButton" */
import { Button } from "@/components/ui/button"
import DialogTriggerButton from "../DialogTriggerButton"
import NewProviderOrderButton from "./NewProviderOrderButton"

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
      manualFetch={true}
      manualCallback={getAllProviders}
      actions={(rowData: any) => {
        return (
          <>
            <NewProviderOrderButton userId={rowData.id} />
            {/* <DialogTriggerButton dialogType="new-provider-order" data={rowData.id} /> */}
            {/* <DeleteProviderButton active={rowData.active} id={rowData.id} />
            <EditProviderButton barcode={rowData.barcode} /> */}
          </>
        )
      }}
    />
  )
}
export default ProvidersTable