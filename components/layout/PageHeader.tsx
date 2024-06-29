"use client"
import { useRouter } from "next/navigation"
import PageTitle from "../PageTitle"
import CustomButton from "./CustomButton"
import { ArrowLeft } from "lucide-react"

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
    <div className="align-top flex justify-between mb-8">
      <div>
        {goBack && (
          <CustomButton variant="ghost" tooltip="Volver" onClick={handleGoBack} className="p-0 aspect-square">
            <ArrowLeft/>
          </CustomButton>
        )}
        {subtitle && <p className="text-muted-foreground">Cajero : {subtitle}</p>}
        <PageTitle title={title} />
      </div>
      <div className="flex gap-4">
        {actions && actions}
      </div>
    </div>
  )
}
export default PageHeader