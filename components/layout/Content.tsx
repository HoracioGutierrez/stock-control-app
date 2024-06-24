import { cn } from "@/lib/utils"


function Content({ children, className }: { children: any, className: string }) {
  return (
    <main className={cn("grid grid-cols-1 md:grid-cols-[300px_1fr] grow", className)}>
      {children}
    </main>
  )
}
export default Content