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
            <CustomButton tooltip={rowData.openedById === null ? "Abrir caja" : "Cerrar caja"} data={rowData.id} variant="ghost" className="p-0 aspect-square group" dialogType={rowData.openedById === null ? "activate-cash-register-close" : "delete-cash-register-close"}>
              {rowData.openedById === null ? <IconDeviceDesktopCheck className="group-hover:text-green-400 p-0 aspect-square" /> : <IconDeviceDesktopOff className="group-hover:text-red-400 p-0 aspect-square" />}
            </CustomButton>
            {isAdmin && (
              <CustomButton variant="ghost" className="p-0 aspect-square group" tooltip={rowData.active ? "Borrar caja" : "Reactivar caja"} dialogType={rowData.active ? "delete-cash-register-delete" : "activate-cash-register-delete"} data={rowData.id}>
                {rowData.active ? <Trash2 className="group-hover:text-red-400 p-0 text-muted-foreground aspect-square" /> : <UndoDot className="group-hover:text-green-400 p-0 text-muted-foreground aspect-square" />}
              </CustomButton>
            )}
            {isAdmin && <CustomButton variant="ghost" className="p-0 aspect-square group" tooltip="Editar caja" dialogType="edit-cash-register" data={rowData.id}>
              <Edit className="group-hover:text-yellow-400 p-0 text-muted-foreground aspect-square" />
            </CustomButton>}
          </>
        )
      }}
    />
  )
}
export default CashRegisterTable