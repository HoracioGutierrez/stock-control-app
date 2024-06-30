import { PageTitleProps } from "@/lib/types"

function PageTitle({ title = "Demo Title", subtitle }: PageTitleProps) {
  return (
    <div className="flex flex-col lg:gap-2">
      <h2 className="font-bold text-2xl text-muted-foreground lg:text-4xl">{title}</h2>
      {subtitle && <p className="text-muted-foreground">Cajero : {subtitle}</p>}
    </div>
  )
}
export default PageTitle