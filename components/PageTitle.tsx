import { PageTitleProps } from "@/lib/types"
import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import GoBackButton from "./GoBackButton"

function PageTitle({ title = "Demo Title", backButton = false }: PageTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {backButton && (
        <GoBackButton />
      )}
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  )
}
export default PageTitle