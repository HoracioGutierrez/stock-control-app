"use client"

import { CustomerTableProps } from "@/lib/types"
import EditProductButton from "./EditProductButton"
import CustomDataTable from "./CustomDataTable"
import DeleteCustomerButton from "./DeleteCustomerButton"

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
                        <DeleteCustomerButton active={rowData.active} id={rowData.id} />
                        <EditProductButton id={rowData.id} />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;