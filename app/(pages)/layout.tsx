import { auth } from "@/auth"
import NavLink from "@/components/NavLink"
import { cn } from "@/lib/utils"
import { Barcode, ComputerIcon, History, LineChart, ShoppingBasket, Truck, UserRound } from "lucide-react"
import Link from "next/link"

type PageLayoutProps = {
  children: React.ReactNode
}

async function PageLayout({ children }: PageLayoutProps) {

  const session = await auth()

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] grow">
      <div id="sidebar" className={cn("hidden md:flex flex-col justify-between h-full", session && "border-r border-accent bg-primary-foreground")}>
        <div>
          <NavLink href="/order">
            <ShoppingBasket />
            <span>nueva orden</span>
          </NavLink>
          <NavLink href="/stock">
            <ComputerIcon />
            <span>caja</span>
          </NavLink>
          <div className="h-[1px] w-full bg-accent" />
          <NavLink href="/products">
            <Barcode />
            <span>productos</span>
          </NavLink>
          <NavLink href="/customers">
            <UserRound />
            <span>clientes</span>
          </NavLink>
          <NavLink href="/providers">
            <Truck />
            <span>proveedores</span>
          </NavLink>
          <div className="h-[1px] w-full bg-accent" />
          <NavLink href="/sales">
            <LineChart />
            <span>ventas</span>
          </NavLink>
          <NavLink href="/movements">
            <History />
            <span>movimientos</span>
          </NavLink>
        </div>
        <div className="flex justify-center items-center p-4 flex-col gap-2 text-xs">
          <p className="text-muted-foreground">Control de Stock - version 0.0.1</p>
          <p className="text-muted-foreground">Desarrollado por @horagutierrez</p>
        </div>
      </div>
      <div id="content" className="p-4 md:p-8 flex flex-col">
        {children}
      </div>
    </main>
  )
}
export default PageLayout