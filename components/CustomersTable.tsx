"use client"

import { CustomerTableProps } from "@/lib/types"
import EditButton from "./EditButton"
import CustomDataTable from "./CustomDataTable"
import DeleteCustomerButton from "./DeleteCustomerButton"
import { getAllCustomers } from "@/actions/getAllCustomers"
import UpdateCustomerDebtButton from "./customer/UpdateCustomerDebtButton"
import CustomButton from "./layout/CustomButton"
import { Eye } from "lucide-react"

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
                        <CustomButton variant="ghost" className="p-0 aspect-square" tooltip="Ver detalles del cliente y sus compras" href={`/customers/${rowData.id}`}>
                            <Eye className="p-0 text-muted-foreground hover:text-yellow-200" />
                        </CustomButton>
                        <UpdateCustomerDebtButton isInDebt={rowData.currentAmount < 0} id={rowData.id} />
                        {isAdmin && <DeleteCustomerButton active={rowData.active} id={rowData.id} />}
                        <EditButton id={rowData.id} entity="customer" />
                    </>
                )
            }}
        />
    )
}

export default CustomersTable;