"use client"
import { useDialogStore } from "@/stores/generalDialog"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import Link from "next/link"
import { Loader } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  children?: any,
  className?: string,
  icon?: JSX.Element,
  text?: string,
  data?: any,
  disabled?: boolean,
  onClick?: any,
  href?: string,
  isLoading?: boolean,
  tooltip?: string,
  dialogType?: string,
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary",
}

function CustomButton({ children, className, icon, text = "Trigger Dialog", data, disabled = false, onClick, isLoading = false, tooltip, dialogType, href, variant }: Props) {

  const { setOpen } = useDialogStore((state: any) => state)

  const handleClick = () => {

    if (dialogType) {
      setOpen(dialogType, data)
    }
    if (onClick) {
      onClick()
    }

  }

  const ButtonEl = ({ children, className, icon, text = "Trigger Dialog", disabled = false, onClick, isLoading = false, variant, ...props }: Props) => {
    return (
      <Button variant={variant} className={cn("text-muted-foreground flex gap-2", className)} onClick={onClick} disabled={disabled}>
        {isLoading && <Loader className="animate-spin" />}
        {!isLoading && icon ? icon : null}
        <span>{children ? children : text ? text : "Trigger Dialog"}</span>
      </Button>
    )
  }

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={variant} className={cn("text-muted-foreground flex gap-2", className)} onClick={handleClick} disabled={disabled}>
              {isLoading && <Loader className="animate-spin" />}
              {!isLoading && icon ? icon : null}
              <span>{children ? children : text ? text : "Trigger Dialog"}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (href) {
    return (
      <ButtonEl className={className} onClick={handleClick} disabled={disabled} href={href} isLoading={isLoading} tooltip={tooltip} dialogType={dialogType} data={data} icon={icon} text={text} variant={variant}>
        <Link href={href}>
          {children ? children : text ? text : "Trigger Dialog"}
        </Link>
      </ButtonEl>
    )
  }

  return (
    <ButtonEl className={className} onClick={handleClick} disabled={disabled} href={href} isLoading={isLoading} tooltip={tooltip} dialogType={dialogType} data={data} icon={icon} text={text} variant={variant}>
      {children ? children : text ? text : "Trigger Dialog"}
    </ButtonEl>
  )
}
export default CustomButton