import { PageTitleProps } from "@/lib/types"

function PageTitle({ title = "Demo Title", subtitle , icon }: PageTitleProps) {
  return (
    <div className="flex flex-col lg:gap-2">
      <div className="flex items-center gap-1 lg:gap-2 transition-all">
        {icon && icon}
        <h2 className="font-bold text-2xl text-muted-foreground lg:text-4xl">{title}</h2>
      </div>
      {subtitle && <p className="text-muted-foreground">Cajero : {subtitle}</p>}
    </div>
  )
}
export default PageTitle