"use client"

import { CustomerTableProps } from "@/lib/types"
import EditProductButton from "./EditProductButton"
import DeleteCustomerButton from "./DeleteCustomerButton"
import CustomDataTable from "./CustomDataTable"
import DeleteResourceButton from "./layout/DeleteResourceButton"
import { Ban } from "lucide-react"

function CustomersTable({ data }: CustomerTableProps) {

    return (
        <CustomDataTable
            data={data}
            type="customers"
            filterColumn="nombre"
            filterKey="name"
            actions={(rowData: any) => {
                return (
                    <>
                        {/* <DeleteCustomerButton active={rowData.active as boolean} id={rowData.id} /> */}
                        <DeleteResourceButton type="customer" data={rowData.id} active={rowData.active as boolean} activeIcon={<Ban className="aspect-square p-0 text-muted-foreground hover:text-red-400" />} />
                        <EditProductButton id={rowData.id} />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;