"use client"

import { Barcode, ComputerIcon, History, Home, LineChart, Menu, PackageOpen, ShoppingBasket, Truck, UserRound, X } from "lucide-react"
import { useDrawerStore } from "@/stores/drawerStore"
import LogoutButton from "./LogoutButton"
import { ModeToggle } from "./ModeToggle"
import NavLink from "./NavLink"
import { cn } from "@/lib/utils"
import { SideBarProps } from "@/lib/types"



function SideBar({ session }: SideBarProps) {

  const { isOpen, setOpen , collapsed, setCollapsed } = useDrawerStore((state: any) => state)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div id="sidebar" className={cn("fixed top-0 -left-full md:static md:flex flex-col justify-between h-full", session && "border-r border-accent bg-primary-foreground w-4/5 z-10 md:w-auto md:bg-primary-foreground md:dark:bg-[rgba(0,0,0,0.5)] transition-all", isOpen && "left-0")}>
      <div>
        <div className="relative flex flex-col items-center py-8 text-2xl">
          <PackageOpen width={40} height={40} />
          <span className="font-bold text-3xl text-center">Control de Stock</span>
          <X className="top-2 right-2 absolute md:hidden cursor-pointer" onClick={handleClick} />
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
          <div className="bg-accent w-full h-[1px]" />
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
          <div className="bg-accent w-full h-[1px]" />
          <NavLink href="/sales" onClick={handleClick}>
            <LineChart />
            <span>ventas</span>
          </NavLink>
          <NavLink href="/movements" onClick={handleClick}>
            <History />
            <span>movimientos</span>
          </NavLink>
        </div>
        <div className="bg-accent w-full h-[1px]" />
        <div>
          <div className="flex items-center gap-2 hover:bg-accent p-2 pl-4 hover:font-bold text-muted-foreground hover:text-accent-foreground transition-colors hover:cursor-pointer" onClick={handleClick}>
            <ModeToggle />
            <span>modo dark</span>
          </div>
          {session && <LogoutButton />}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 p-4 text-xs">
        <p className="text-muted-foreground">Control de Stock - version 0.0.1</p>
        <p className="text-muted-foreground">Desarrollado por @horagutierrez</p>
      </div>
    </div>
  )
}

export default SideBar