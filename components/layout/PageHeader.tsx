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
    <div className="align-top flex justify-between mb-8">
      <div>
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