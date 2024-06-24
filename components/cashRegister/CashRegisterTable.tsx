"use client"
import { Ban } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import DeleteResourceButton from "../layout/DeleteResourceButton"
import { getAllCashRegisters } from "@/actions/getAllCashRegisters"
import EditButton from "../EditButton"

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
            <DeleteResourceButton
              type="cash-register-close"
              data={rowData.id}
              active={rowData.openedById === null ? false : true}
              activeIcon={<Ban className="p-0 text-muted-foreground hover:text-red-400 aspect-square" />}
              tooltip={rowData.openedById === null ? "Abrir caja" : "Cerrar caja"}
            />
            {isAdmin && (
              <DeleteResourceButton
                type="cash-register-delete"
                data={rowData.id}
                active={rowData.active}
                tooltip={rowData.active ? "Bloquear Caja" : "Desbloquear caja"}
              />
            )}
            {isAdmin && (
              <EditButton id={rowData.id} entity="cash-register" />
            )}
          </>
        )
      }}
    />
  )
}
export default CashRegisterTable