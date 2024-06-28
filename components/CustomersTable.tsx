"use client"

import { CustomerTableProps } from "@/lib/types"
import CustomDataTable from "./CustomDataTable"
import { UserRoundX, UserRoundCheck, Edit, HandCoins } from "lucide-react"
import { getAllCustomers } from "@/actions/getAllCustomers"
import CustomButton from "./layout/CustomButton"

function CustomersTable({ data, isAdmin }: CustomerTableProps) {

    return (
        <CustomDataTable
            data={data}
            type="customers"
            filterColumn="nombre"
            filterKey="name"
            manualFetch={true}
            manualCallback={getAllCustomers}
            actions={(rowData: any) => {
                return (
                    <>
                        <CustomButton tooltip="Actualizar deuda" data={rowData.id} variant="ghost" className="aspect-square p-0 group" dialogType="update-customer-debt" disabled={rowData.currentAmount >= 0}>
                            <HandCoins className="p-0 aspect-square group-hover:text-green-400" />
                        </CustomButton>

                        {isAdmin && <CustomButton tooltip={rowData.active ? "Eliminar cliente" : "Reactivar cliente"} data={rowData.id} variant="ghost" className="aspect-square p-0 group" dialogType={rowData.active ? "delete-customer" : "activate-customer"}>
                            {rowData.active && <UserRoundX className="p-0 aspect-square group-hover:text-red-400" />}
                            {!rowData.active && <UserRoundCheck className="p-0 aspect-square group-hover:text-green-400" />}
                        </CustomButton>}
                        <CustomButton tooltip="Editar cliente" data={rowData.id} variant="ghost" className="aspect-square p-0 group" dialogType="edit-customer">
                            <Edit className="p-0 aspect-square group-hover:text-yellow-400" />
                        </CustomButton>
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;