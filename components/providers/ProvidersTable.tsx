"use client"
import { getAllProviders } from "@/actions/getAllProviders"
import CustomDataTable from "@/components/CustomDataTable"
import NewProviderOrderButton from "./NewProviderOrderButton"
import DeleteProviderButton from "./DeleteProviderButton"
import EditButton from "../EditButton"

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
            <DeleteProviderButton active={rowData.active} id={rowData.id} />
            <EditButton id={rowData.id} entity="provider" />
          </>
        )
      }}
    />
  )
}
export default ProvidersTable