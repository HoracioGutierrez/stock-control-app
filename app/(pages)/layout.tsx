import { auth } from "@/auth"
import SideBar from "@/components/layout/SideBar"

type PageLayoutProps = {
  children: React.ReactNode
}

async function PageLayout({ children }: PageLayoutProps) {

  const session = await auth()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] grow">
      <div className="md:static absolute md:px-4 md:py-4">
        <SideBar session={session} />
      </div>
      <main id="content" className="flex flex-col dark:bg-transparent dark:from-transparent dark:via-transparent to-primary-foreground dark:to-transparent p-4 overflow-auto">
        {children}
      </main>
    </div>
  )
}
export default PageLayout