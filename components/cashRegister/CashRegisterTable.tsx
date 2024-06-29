"use client"
import CustomDataTable from "../CustomDataTable"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import { IconDeviceDesktopOff, IconDeviceDesktopCheck } from '@tabler/icons-react'
import CustomButton from "../layout/CustomButton"
import { Edit, Trash2, UndoDot } from "lucide-react"

type Props = {
  data: any
  isAdmin?: boolean
}

function CashRegisterTable({ data, isAdmin }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="cash-registers"
      filterColumn="label"
      filterKey="label"
      manualFetch={true}
      manualCallback={getAllCashRegisters}
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton tooltip={rowData.openedById === null ? "Abrir caja" : "Cerrar caja"} data={rowData.id} variant="ghost" className="aspect-square p-0 group" dialogType={rowData.openedById === null ? "activate-cash-register-close" : "delete-cash-register-close"}>
              {rowData.openedById === null ? <IconDeviceDesktopCheck className="p-0 aspect-square group-hover:text-green-400" /> : <IconDeviceDesktopOff className="p-0 aspect-square group-hover:text-red-400" />}
            </CustomButton>
            {isAdmin && (
              <CustomButton variant="ghost" className="p-0 group aspect-square" tooltip="Borrar caja" dialogType="delete-cash-register-delete" data={rowData.id}>
                {rowData.active ? <Trash2 className="p-0 text-muted-foreground group-hover:text-red-400 aspect-square" /> : <UndoDot className="p-0 text-muted-foreground group-hover:text-green-400 aspect-square" />}
              </CustomButton>
            )}
            {isAdmin && <CustomButton variant="ghost" className="p-0 group aspect-square" tooltip="Editar caja" dialogType="edit-cash-register" data={rowData.id}>
              <Edit className="p-0 text-muted-foreground group-hover:text-yellow-400 aspect-square" />
            </CustomButton>}
          </>
        )
      }}
    />
  )
}
export default CashRegisterTable