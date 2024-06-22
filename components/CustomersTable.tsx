"use client"

import { CustomerTableProps } from "@/lib/types"
import EditProductButton from "./EditProductButton"
import CustomDataTable from "./CustomDataTable"
import DeleteCustomerButton from "./DeleteCustomerButton"
import { getAllCustomers } from "@/actions/getAllCustomers"

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
                        {isAdmin && <DeleteCustomerButton active={rowData.active} id={rowData.id} />}
                        <EditProductButton id={rowData.id} />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;