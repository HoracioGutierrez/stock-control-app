"use client"
import { Ban } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import DeleteResourceButton from "../layout/DeleteResourceButton"

type Props = {
  data: any
}

function CashRegisterTable({ data }: Props) {
  return (
    <CustomDataTable
      data={data}
      type="cash-registers"
      filterColumn="label"
      filterKey="label"
      actions={(rowData: any) => {
        return (
          <>
            <DeleteResourceButton
              type="cash-register-close"
              data={rowData.id}
              active={rowData.openedById === null ? false : true}
              activeIcon={<Ban className="aspect-square p-0 text-muted-foreground hover:text-red-400" />}
              tooltip={rowData.openedById === null ? "Abrir caja" : "Cerrar caja"}
            />
            <DeleteResourceButton
              type="cash-register-close"
              data={rowData.id}
              active={rowData.active}
              tooltip={rowData.active ? "Bloquear Caja" : "Desbloquear caja"}
            />
          </>
        )
      }}
    />
  )
}
export default CashRegisterTable