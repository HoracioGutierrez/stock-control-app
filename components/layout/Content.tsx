import { cn } from "@/lib/utils"


function Content({ children, className }: { children: any, className: string }) {
  return (
    <main className={cn("grid grid-cols-1 grow", className)}>
      {children}
    </main>
  )
}
export default Content