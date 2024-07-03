"use client"
import { useRouter } from "next/navigation"
import PageTitle from "../PageTitle"
import CustomButton from "./CustomButton"
import { ArrowLeft } from "lucide-react"
import DrawerToggleButton from "../DrawerToggleButton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type PageHeaderProps = {
  title: string,
  actions?: JSX.Element[] | JSX.Element | null,
  subtitle?: string,
  goBack?: boolean,
  icon?: JSX.Element
}

const PageHeader = ({ title = "Demo Title", actions, subtitle, goBack = false, icon }: PageHeaderProps) => {

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <header className="align-top flex justify-between mb-4 lg:mb-8">
      <div>
        <div className="flex items-center gap-2 pb-4">
          <DrawerToggleButton />
          {goBack && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild onClick={handleGoBack}>
                  <ArrowLeft width={28} height={28} className="text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Volver</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <PageTitle title={title} subtitle={subtitle} icon={icon} />
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