import { auth } from "@/auth"
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
      <div id="sidebar" className={cn("hidden md:flex flex-col justify-between h-full", session && "border-r border-slate-400 bg-primary-foreground")}>
        <div>
          <Link href="/order" className="flex items-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <ShoppingBasket />
            <span>nueva orden</span>
          </Link>
          <Link href="/stock" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <ComputerIcon />
            <span>caja</span>
          </Link>
          <div className="h-[1px] w-full bg-slate-400" />
          <Link href="/products" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <Barcode />
            <span>productos</span>
          </Link>
          <Link href="/clients" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <UserRound />
            <span>clientes</span>
          </Link>
          <Link href="/providers" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <Truck />
            <span>proveedores</span>
          </Link>
          <div className="h-[1px] w-full bg-slate-400" />
          <Link href="/sales" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <LineChart />
            <span>ventas</span>
          </Link>
          <Link href="/movements" className="flex flex-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer">
            <History />
            <span>movimientos</span>
          </Link>
        </div>
        <div className="flex justify-center items-center p-4 flex-col gap-2 text-xs">
          <p className="text-muted-foreground">Control de Stock - version 0.0.1</p>
          <p className="text-muted-foreground">Desarrollado por @horagutierrez</p>
        </div>
      </div>
      <div id="content" className="p-4 flex flex-col">
        {children}
      </div>
    </main>
  )
}
export default PageLayout