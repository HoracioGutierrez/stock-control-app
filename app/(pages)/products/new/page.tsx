import { auth } from "@/auth"
import NewProductButton from "@/components/NewProductButton"
import NewProductForm from "@/components/NewProductForm"
import PageTitle from "@/components/PageTitle"

async function NewProductPage() {

  const session = await auth()

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Nuevo Producto" backButton />
        <NewProductButton />
      </div>
      <NewProductForm userId={session?.user.id as string} />
    </>
  )
}
export default NewProductPage