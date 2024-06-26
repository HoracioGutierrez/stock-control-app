"use client"

import { Edit, Trash2 } from "lucide-react"
import CustomDataTable from "../CustomDataTable"
import CustomButton from "../layout/CustomButton"
import { getAllUsers } from "@/actions/getAllUsers"

type Props = {
  users: any[]
  userId: string
}
function UsersTable({ users, userId }: Props) {

  return (
    <CustomDataTable
      type="users"
      data={users}
      filterColumn="name"
      filterKey="name"
      manualFetch={true}
      manualCallback={getAllUsers}
      actions={(rowData: any) => {
        return (
          <>
            <CustomButton variant="ghost" className="p-0 hover:text-yellow-400 aspect-square" tooltip="Editar usuario" dialogType="edit-user" data={rowData.id}>
              <Edit />
            </CustomButton>
            <CustomButton variant="ghost" className="p-0 hover:text-red-400 aspect-square" tooltip="Borrar usuario" dialogType="delete-user" data={rowData.id}>
              <Trash2 />
            </CustomButton>
          </>
        )
      }}
    />
  )
}
export default UsersTable