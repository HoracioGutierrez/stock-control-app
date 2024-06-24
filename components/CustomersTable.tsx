"use client"

import { CustomerTableProps } from "@/lib/types"
import EditButton from "./EditButton"
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
                        <EditButton id={rowData.id} entity="customer" />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;