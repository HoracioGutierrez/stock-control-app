import { PageTitleProps } from "@/lib/types"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "./ui/button"
import GoBackButton from "./GoBackButton"
import DrawerToggleButton from "./DrawerToggleButton"

function PageTitle({ title = "Demo Title", backButton = false }: PageTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {backButton && (
        <GoBackButton />
      )}
      <DrawerToggleButton />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  )
}
export default PageTitle