"use client"
import { getAllProviders } from "@/actions/getAllProviders"
import CustomDataTable from "@/components/CustomDataTable"
import { Eye } from "lucide-react"
import CustomButton from "../layout/CustomButton"
import { IconTruck, IconTruckOff } from "@tabler/icons-react"
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
            <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del proveedor y ordenes de compra hechas" href={`/providers/${rowData.id}`}>
              <Eye />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 aspect-square group" tooltip="Crear orden de compra" dialogType="new-provider-order" data={rowData.id}>
              <ShoppingBasket className="group-hover:text-yellow-200 p-0 text-muted-foreground aspect-square" />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 aspect-square group" tooltip={rowData.active ? "Borrar proveedor" : "Reactivar proveedor"} dialogType={rowData.active ? "delete-provider" : "activate-provider"} data={rowData.id}>
              {rowData.active ? <IconTruckOff className="group-hover:text-red-400 p-0 text-muted-foreground aspect-square" /> : <IconTruck className="group-hover:text-green-400 p-0 text-muted-foreground aspect-square" />}
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 aspect-square group" tooltip="Editar proveedor" dialogType="edit-provider" data={rowData.id}>
              <Edit className="group-hover:text-yellow-400 p-0 text-muted-foreground aspect-square" />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default ProvidersTable