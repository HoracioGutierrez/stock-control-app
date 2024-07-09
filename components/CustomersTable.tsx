"use client"

import { CustomerTableProps } from "@/lib/types"
import CustomDataTable from "./CustomDataTable"
import { UserRoundX, UserRoundCheck, Edit, HandCoins } from "lucide-react"
import { getAllCustomers } from "@/actions/getAllCustomers"
import { Eye } from "lucide-react"
import CustomButton from "./layout/CustomButton"

function CustomersTable({ data, isAdmin }: CustomerTableProps) {

    return (
        <CustomDataTable
            data={data ? data : []}
            type="customers"
            filterColumn="nombre"
            filterKey="name"
            manualFetch={true}
            manualCallback={getAllCustomers}
            actions={(rowData: any) => {
                return (
                    <>
                        <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del cliente y sus compras" href={`/customers/${rowData.id}`}>
                            <Eye className="p-0 text-muted-foreground hover:text-yellow-200" />
                        </CustomButton>
                        <CustomButton tooltip="Actualizar deuda" data={rowData.id} variant="ghost" className="p-0 aspect-square group" dialogType="update-customer-debt" disabled={rowData.currentAmount >= 0}>
                            <HandCoins className="group-hover:text-green-400 p-0 aspect-square" />
                        </CustomButton>
                        {isAdmin && <CustomButton tooltip={rowData.active ? "Eliminar cliente" : "Reactivar cliente"} data={rowData.id} variant="ghost" className="p-0 aspect-square group" dialogType={rowData.active ? "delete-customer" : "activate-customer"}>
                            {rowData.active && <UserRoundX className="group-hover:text-red-400 p-0 aspect-square" />}
                            {!rowData.active && <UserRoundCheck className="group-hover:text-green-400 p-0 aspect-square" />}
                        </CustomButton>}
                        <CustomButton tooltip="Editar cliente" data={rowData.id} variant="ghost" className="p-0 aspect-square group" dialogType="edit-customer">
                            <Edit className="group-hover:text-yellow-400 p-0 aspect-square" />
                        </CustomButton>
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;