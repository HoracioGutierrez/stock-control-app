"use client"

import { useDrawerStore } from "@/stores/drawerStore"
import { Button } from "./ui/button"
import { Barcode, ComputerIcon, History, Home, LineChart, Menu, PackageOpen, ShoppingBasket, Truck, UserRound, X } from "lucide-react"
import NavLink from "./NavLink"
import { ModeToggle } from "./ModeToggle"
import LogoutButton from "./LogoutButton"
import { cn } from "@/lib/utils"

type SideBarProps = {
  session: any
}

function SideBar({ session }: SideBarProps) {

  const { isOpen, setOpen } = useDrawerStore((state: any) => state)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div id="sidebar" className={cn("fixed top-0 -left-full md:static md:flex flex-col justify-between h-full", session && "border-r border-accent bg-primary-foreground w-4/5 z-10 md:w-auto md:bg-primary-foreground md:dark:bg-[rgba(0,0,0,0.5)] transition-all", isOpen && "left-0")}>
      <div>
        <div className="text-2xl flex flex-col items-center py-8 relative">
          <PackageOpen width={40} height={40} />
          <span className="text-3xl font-bold text-center">Control de Stock</span>
          <X className="absolute right-2 top-2 md:hidden cursor-pointer" onClick={handleClick} />
        </div>
        <div>
          <NavLink href="/" onClick={handleClick}>
            <Home />
            <span>inicio</span>
          </NavLink>
          <NavLink href="/order" onClick={handleClick}>
            <ShoppingBasket />
            <span>nueva orden</span>
          </NavLink>
          <NavLink href="/stock" onClick={handleClick}>
            <ComputerIcon />
            <span>caja</span>
          </NavLink>
          <div className="h-[1px] w-full bg-accent" />
          <NavLink href="/products" onClick={handleClick}>
            <Barcode />
            <span>productos</span>
          </NavLink>
          <NavLink href="/customers" onClick={handleClick}>
            <UserRound />
            <span>clientes</span>
          </NavLink>
          <NavLink href="/providers" onClick={handleClick}>
            <Truck />
            <span>proveedores</span>
          </NavLink>
          <div className="h-[1px] w-full bg-accent" />
          <NavLink href="/sales" onClick={handleClick}>
            <LineChart />
            <span>ventas</span>
          </NavLink>
          <NavLink href="/movements" onClick={handleClick}>
            <History />
            <span>movimientos</span>
          </NavLink>
        </div>
        <div className="h-[1px] w-full bg-accent" />
        <div>
          <div className="flex items-center gap-2 p-2 pl-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer text-muted-foreground hover:font-bold" onClick={handleClick}>
            <ModeToggle />
            <span>modo dark</span>
          </div>
          {session && <LogoutButton />}
        </div>
      </div>
      <div className="flex justify-center items-center p-4 flex-col gap-2 text-xs">
        <p className="text-muted-foreground">Control de Stock - version 0.0.1</p>
        <p className="text-muted-foreground">Desarrollado por @horagutierrez</p>
      </div>
    </div>
  )
}

export default SideBar