"use client"

import { ArrowLeftToLine, ArrowRightToLine, Barcode, ComputerIcon, History, Home, LineChart, Menu, PackageOpen, ShoppingBasket, Truck, UserRound, X } from "lucide-react"
import { useDrawerStore } from "@/stores/drawerStore"
import { ModeToggle } from "../ModeToggle"
import NavLink from "../NavLink"
import { cn } from "@/lib/utils"
import { SideBarProps } from "@/lib/types"
import LogoutButton from "../LogoutButton"



function SideBar({ session }: SideBarProps) {

  const { isOpen, setOpen, collapsed, setCollapsed } = useDrawerStore((state: any) => state)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div id="sidebar" className={cn("fixed top-0 -left-full md:static md:flex flex-col justify-between h-full", session && "border-r border-accent bg-primary-foreground w-4/5 z-10 md:w-auto md:bg-primary-foreground md:dark:bg-[rgba(0,0,0,0.5)] transition-all", isOpen && "left-0", collapsed && "!w-fit")}>
      <div className={cn("transition-all", collapsed && "w-fit")}>
        <div className={cn("flex flex-col justify-between items-center gap-4 p-4 transition-all",collapsed && "py-4 px-2")}>
          <div className="relative flex flex-col items-center text-2xl">
            <PackageOpen width={40} height={40} />
            <span className={cn("font-bold text-3xl text-center",collapsed && "hidden")}>Control de Stock</span>
          </div>
          <X className="top-2 right-2 absolute md:hidden cursor-pointer" onClick={handleClick} />
          {collapsed ? <ArrowRightToLine onClick={handleCollapse} className="cursor-pointer" /> : <ArrowLeftToLine onClick={handleCollapse} className="cursor-pointer" />}
        </div>
        <div>
          <NavLink href="/" onClick={handleClick}>
            <Home />
            <span className={cn(collapsed && "hidden")}>inicio</span>
          </NavLink>
          <NavLink href="/order" onClick={handleClick}>
            <ShoppingBasket />
            <span className={cn(collapsed && "hidden")}>nueva orden</span>
          </NavLink>
          <NavLink href="/stock" onClick={handleClick}>
            <ComputerIcon />
            <span className={cn(collapsed && "hidden")}>caja</span>
          </NavLink>
          <div className="bg-accent w-full h-[1px]" />
          <NavLink href="/products" onClick={handleClick}>
            <Barcode />
            <span className={cn(collapsed && "hidden")}>productos</span>
          </NavLink>
          <NavLink href="/customers" onClick={handleClick}>
            <UserRound />
            <span className={cn(collapsed && "hidden")}>clientes</span>
          </NavLink>
          <NavLink href="/providers" onClick={handleClick}>
            <Truck />
            <span className={cn(collapsed && "hidden")}>proveedores</span>
          </NavLink>
          <div className="bg-accent w-full h-[1px]" />
          <NavLink href="/sales" onClick={handleClick}>
            <LineChart />
            <span className={cn(collapsed && "hidden")}>ventas</span>
          </NavLink>
          {session?.user.isAdmin && (
            <>
              <NavLink href="/movements" onClick={handleClick}>
                <History />
                <span className={cn(collapsed && "hidden")}>movimientos</span>
              </NavLink>
              <div className="bg-accent w-full h-[1px]" />
            </>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 hover:bg-accent p-2 pl-4 hover:font-bold text-muted-foreground hover:text-accent-foreground transition-colors hover:cursor-pointer" onClick={handleClick}>
            <ModeToggle />
            <span className={cn(collapsed && "hidden")}>modo dark</span>
          </div>
          {session && <LogoutButton collapsed={collapsed} />}
        </div>
      </div>
      <div className={cn("flex flex-col justify-center items-center gap-2 p-4 text-xs transition-all",collapsed && "hidden")}>
        <p className="text-muted-foreground">Control de Stock - version 0.0.1</p>
        <p className="text-muted-foreground">Desarrollado por @horagutierrez</p>
      </div>
    </div>
  )
}

export default SideBar