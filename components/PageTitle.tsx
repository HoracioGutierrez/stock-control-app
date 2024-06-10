import { PageTitleProps } from "@/lib/types"

function PageTitle({ title = "Demo Title" }: PageTitleProps) {
  return (
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
  )
}
export default PageTitle