import { auth } from "@/auth"
import LogoutButton from "./LogoutButton"
import { ModeToggle } from "./ModeToggle"
import { Menu, PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"

async function Header() {

  const session = await auth()

  return (
    <header className={cn("justify-between grid grid-cols-1 md:grid-cols-[300px_1fr]", session && "bg-primary-foreground border-b border-accent")}>
      <div className={cn("items-center gap-2 hidden md:flex p-4", session && "border-r border-accent justify-center flex-col")}>
        <PackageOpen className="w-6 h-6" />
        <h1 className="font-bold text-2xl">Control de Stock</h1>
      </div>
      <div className="flex justify-between justify-self-auto md:justify-self-end items-center p-4">
        <Menu className="md:hidden w-6 h-6" />
        <nav className="flex gap-8">
          {session && <LogoutButton collapsed={false}/>}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
export default Header