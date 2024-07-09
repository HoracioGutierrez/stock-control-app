import { auth } from "@/auth"
import AccountDialog from "@/components/account/AccountDialog"
import AccountEditForm from "@/components/account/AccountEditForm"
import PageHeader from "@/components/layout/PageHeader"
import { UserCogIcon } from "lucide-react"

async function page() {

  const session = await auth()

  return (
    <>
      <PageHeader title="Cuenta" goBack icon={<UserCogIcon className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} />
      <AccountEditForm user={session?.user} />
      <AccountDialog user={session?.user} />
    </>
  )
}
export default page