import { LoginContentProps } from "@/lib/types"
import { cn } from "@/lib/utils"


function Content({ children, className }: LoginContentProps) {
  return (
    <main className={cn("p-4 grow", className)}>
      {children}
    </main>
  )
}
export default Content