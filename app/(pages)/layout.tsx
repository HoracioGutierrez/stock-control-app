import { auth } from "@/auth"
import SideBar from "@/components/layout/SideBar"

type PageLayoutProps = {
  children: React.ReactNode
}

async function PageLayout({ children }: PageLayoutProps) {

  const session = await auth()

  return (
    <main className="grid grid-cols-1 md:grid-cols-[max-content_1fr] grow">
      <SideBar session={session} />
      <div id="content" className="flex flex-col dark:bg-transparent bg-gradient-to-br from-accent dark:from-transparent via-accent dark:via-transparent to-primary-foreground dark:to-transparent p-4 md:p-8 overflow-auto">
        {children}
      </div>
    </main>
  )
}
export default PageLayout