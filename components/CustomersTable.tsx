"use client"

import { CustomerTableProps } from "@/lib/types"
import EditProductButton from "./EditProductButton"
import DeleteCustomerButton from "./DeleteCustomerButton"
import CustomDataTable from "./CustomDataTable"

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
                        <DeleteCustomerButton active={rowData.active as boolean} id={rowData.id} />
                        <EditProductButton id={rowData.id} />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;