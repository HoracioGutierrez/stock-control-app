import { auth } from "@/auth"
import LogoutButton from "./LogoutButton"
import { ModeToggle } from "./ModeToggle"
import { Menu, PackageOpen } from "lucide-react"
import { cn } from "@/lib/utils"

async function Header() {

  const session = await auth()

  return (
    <header className={cn("justify-between grid grid-cols-1 md:grid-cols-[300px_1fr]", session && "bg-primary-foreground border-b border-slate-400")}>
      <div className={cn("items-center gap-2 hidden md:flex p-4", session && "border-r border-slate-400")}>
        <PackageOpen className="h-6 w-6 " />
        <h1 className="text-2xl font-bold">Control de Stock</h1>
      </div>
      <div className="md:justify-self-end flex justify-between justify-self-auto items-center p-4">
        <Menu className="h-6 w-6 md:hidden" />
        <nav className="gap-8 flex ">
          {session && <LogoutButton />}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
export default Header