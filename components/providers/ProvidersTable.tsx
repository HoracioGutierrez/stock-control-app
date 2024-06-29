"use client"
import { getAllProviders } from "@/actions/getAllProviders"
import CustomDataTable from "@/components/CustomDataTable"
import NewProviderOrderButton from "./NewProviderOrderButton"
import DeleteProviderButton from "./DeleteProviderButton"
import EditButton from "../EditButton"
import CustomButton from "../layout/CustomButton"
import { Eye } from "lucide-react"

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
            {/* <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del proveedor y ordenes de compra hechas" dialogType="provider-details" data={rowData.id}>
              <Eye/>
            </CustomButton> */}
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del proveedor y ordenes de compra hechas" href={`/providers/${rowData.id}`}>
              <Eye/>
            </CustomButton>
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