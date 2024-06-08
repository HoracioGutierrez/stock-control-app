import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode,
  className?: string
}
function Content({ children, className }: Props) {
  return (
    <main className={cn("p-4 grow", className)}>
      {children}
    </main>
  )
}
export default Content