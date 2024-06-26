import { auth } from "@/auth"
import AccountDialog from "@/components/account/AccountDialog"
import AccountEditForm from "@/components/account/AccountEditForm"
import PageHeader from "@/components/layout/PageHeader"

async function page() {

  const session = await auth()

  return (
    <>
      <PageHeader title="Cuenta" />
      <AccountEditForm user={session?.user} />
      <AccountDialog user={session?.user} />
    </>
  )
}
export default page