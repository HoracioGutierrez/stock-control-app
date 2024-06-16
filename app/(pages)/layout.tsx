import { auth } from "@/auth"
import LogoutButton from "@/components/LogoutButton"
import { ModeToggle } from "@/components/ModeToggle"
import NavLink from "@/components/NavLink"
import SideBar from "@/components/SideBar"
import { cn } from "@/lib/utils"
import { Barcode, ComputerIcon, History, Home, LineChart, PackageOpen, ShoppingBasket, Truck, UserRound } from "lucide-react"
import Link from "next/link"

type PageLayoutProps = {
  children: React.ReactNode
}

async function PageLayout({ children }: PageLayoutProps) {

  const session = await auth()

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] grow">
      <SideBar session={session} />
      <div id="content" className="p-4 md:p-8 flex flex-col dark:bg-transparent dark:from-transparent dark:via-transparent dark:to-transparent bg-gradient-to-br from-accent via-accent to-primary-foreground overflow-auto">
        {children}
      </div>
    </main>
  )
}
export default PageLayout