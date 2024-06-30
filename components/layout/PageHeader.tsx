"use client"
import { useRouter } from "next/navigation"
import PageTitle from "../PageTitle"
import CustomButton from "./CustomButton"
import { ArrowLeft } from "lucide-react"
import DrawerToggleButton from "../DrawerToggleButton"

type PageHeaderProps = {
  title: string,
  actions?: JSX.Element[] | JSX.Element | null,
  subtitle?: string,
  goBack?: boolean
}

const PageHeader = ({ title = "Demo Title", actions, subtitle, goBack = false }: PageHeaderProps) => {

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <header className="align-top flex justify-between mb-4 lg:mb-8">
      <div>
        <div className="flex items-center gap-2">
          <DrawerToggleButton />
          {goBack && (
            <CustomButton variant="ghost" tooltip="Volver" onClick={handleGoBack} className="p-0 aspect-square">
              <ArrowLeft />
            </CustomButton>
          )}
        </div>
        <PageTitle title={title} subtitle={subtitle} />
      </div>
      {actions && (
        <div className="flex gap-4">
          {actions}
        </div>
      )}
    </header>
  )
}
export default PageHeader