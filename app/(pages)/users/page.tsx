import { getAllUsers } from "@/actions/getAllUsers"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import PageHeader from "@/components/layout/PageHeader"
import UsersDialog from "@/components/users/UsersDialog"
import UsersTable from "@/components/users/UsersTable"
import { UserPlus } from "lucide-react"

async function page() {

  const session = await auth()
  const { data, error } = await getAllUsers()

  return (
    <>
      <PageHeader title="Usuarios" actions={
        <>
          <CustomButton icon={<UserPlus />} tooltip="Crear Usuario" dialogType="new-user">
            Crear Usuario
          </CustomButton>
        </>
      } />
      <UsersTable users={data} userId={session?.user.id as string} />
      <UsersDialog userId={session?.user.id as string} />
    </>
  )
}
export default page