"use client"
import { getAllProviders } from "@/actions/getAllProviders"
import CustomDataTable from "@/components/CustomDataTable"
import CustomButton from "../layout/CustomButton"
import { IconTruckOff } from "@tabler/icons-react"
import { Edit, ShoppingBasket } from "lucide-react"

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
            <CustomButton variant="ghost" className="p-0 group aspect-square" tooltip="Crear orden de compra" dialogType="new-provider-order" data={rowData.id}>
              <ShoppingBasket className="p-0 text-muted-foreground group-hover:text-yellow-200 aspect-square" />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 group aspect-square" tooltip="Borrar proveedor" dialogType="delete-provider" data={rowData.id}>
              <IconTruckOff className="p-0 text-muted-foreground group-hover:text-red-400 aspect-square" />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 group aspect-square" tooltip="Editar proveedor" dialogType="edit-provider" data={rowData.id}>
              <Edit className="p-0 text-muted-foreground group-hover:text-yellow-400 aspect-square" />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default ProvidersTable