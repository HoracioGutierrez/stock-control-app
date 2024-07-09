import { getAllUsers } from "@/actions/getAllUsers"
import { auth } from "@/auth"
import CustomButton from "@/components/layout/CustomButton"
import PageHeader from "@/components/layout/PageHeader"
import UsersDialog from "@/components/users/UsersDialog"
import UsersTable from "@/components/users/UsersTable"
import { UserPlus, Users } from "lucide-react"

async function page() {

  const session = await auth()
  const { data, error } = await getAllUsers()

  return (
    <>
      <PageHeader title="Usuarios" goBack icon={<Users className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} actions={
        <>
          <CustomButton tooltip="Crear Usuario" dialogType="new-user" variant="ghost" className="p-2 group" icon={<UserPlus />}>
            <span className="md:block hidden">Crear Usuario</span>
          </CustomButton>
        </>
      } />
      <UsersTable users={data} userId={session?.user.id as string} />
      <UsersDialog userId={session?.user.id as string} />
    </>
  )
}
export default page