import { getAllUsers } from "@/actions/getAllUsers"
import { auth } from "@/auth"
import PageHeader from "@/components/layout/PageHeader"
import UsersDialog from "@/components/users/UsersDialog"
import UsersTable from "@/components/users/UsersTable"

async function page() {

  const session = await auth()
  const { data, error } = await getAllUsers()

  return (
    <>
      <PageHeader title="Usuarios" />
      <UsersTable users={data} userId={session?.user.id as string} />
      <UsersDialog userId={session?.user.id as string} />
    </>
  )
}
export default page