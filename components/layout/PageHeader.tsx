import { PlusIcon } from "lucide-react"
import PageTitle from "../PageTitle"
import { Button } from "../ui/button"

type PageHeaderProps = {
  title: string,
  actions?: JSX.Element[] | JSX.Element | null,
  subtitle?: string
}

const PageHeader = ({ title = "Demo Title", actions, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div>
        {subtitle && <p className="text-muted-foreground">Cajero : {subtitle}</p>}
        <PageTitle title={title} />
      </div>
      {actions && actions}
    </div>
  )
}
export default PageHeader