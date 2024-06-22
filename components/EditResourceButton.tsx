import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDialogStore } from "@/stores/generalDialog"
import { Edit, Trash2, UndoDot } from "lucide-react"

type Props = {
  active: boolean
  type?: string
  data?: any
  activeIcon?: JSX.Element
  inactiveIcon?: JSX.Element
  tooltip?: string
}

function EditResourceButton({ active, type, data, activeIcon, inactiveIcon, tooltip = "Tooltip" }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {
    setOpen("edit-" + type, data)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"ghost"} className="p-0 aspect-square" onClick={handleClick}>
              <Edit className="p-0 text-muted-foreground hover:text-yellow-200 aspect-square" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default EditResourceButton