import { PlusIcon } from "lucide-react"
import PageTitle from "../PageTitle"
import { Button } from "../ui/button"

type PageHeaderProps = {
  title: string,
  actions?: JSX.Element[] | JSX.Element | null
}

const PageHeader = ({ title = "Demo Title", actions }: PageHeaderProps) => {
  return (
    <div className="flex justify-between">
      <PageTitle title={title} />
      {actions && actions}
    </div>
  )
}
export default PageHeader