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
  type?: "button" | "submit",
}

function CustomButton({ children, className, icon, text = "Trigger Dialog", data, disabled = false, onClick, isLoading = false, tooltip, dialogType, href, variant ,type = "button" }: Props) {

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
      <Button variant={variant} className={cn("text-muted-foreground flex md:gap-2 max-sm:px-2 max-sm:py-1", className)} onClick={onClick} disabled={disabled} type={type}>
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
            <Button variant={variant} className={cn("text-muted-foreground flex md:gap-2 max-sm:px-2 max-sm:py-1", className)} onClick={handleClick} disabled={disabled} asChild={href ? true : false} type={type}>
              {href ? (
                <Link href={href}>
                  {isLoading && <Loader className="animate-spin" />}
                  {!isLoading && icon ? icon : null}
                  <span>{children ? children : text ? text : "Trigger Dialog"}</span>
                </Link>
              ) : (
                <>
                  {isLoading && <Loader className="animate-spin" />}
                  {!isLoading && icon ? icon : null}
                  <span>{children ? children : text ? text : "Trigger Dialog"}</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px] text-center">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (href) {
    return (
      <Button variant={variant} className={cn("text-muted-foreground flex md:gap-2 max-sm:px-2 max-sm:py-1", className)} onClick={handleClick} disabled={disabled} asChild={href ? true : false} type={type}>
        {href ? (
          <Link href={href}>
            {isLoading && <Loader className="animate-spin" />}
            {!isLoading && icon ? icon : null}
            <span>{children ? children : text ? text : "Trigger Dialog"}</span>
          </Link>
        ) : (
          <>
            {isLoading && <Loader className="animate-spin" />}
            {!isLoading && icon ? icon : null}
            <span>{children ? children : text ? text : "Trigger Dialog"}</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <ButtonEl className={className} onClick={handleClick} disabled={disabled} href={href} isLoading={isLoading} tooltip={tooltip} dialogType={dialogType} data={data} icon={icon} text={text} variant={variant} type={type}>
      {children ? children : text ? text : "Trigger Dialog"}
    </ButtonEl>
  )
}
export default CustomButton