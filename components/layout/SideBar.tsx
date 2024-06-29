"use client"

import { ArrowLeftToLine, ArrowRightToLine, Barcode, ComputerIcon, History, Home, LineChart, Menu, PackageOpen, Settings, ShoppingBasket, Truck, User, UserCogIcon, UserRound, Users, X } from "lucide-react"
import { useDrawerStore } from "@/stores/drawerStore"
import { ModeToggle } from "../ModeToggle"
import NavLink from "../NavLink"
import { cn } from "@/lib/utils"
import { SideBarProps } from "@/lib/types"
import LogoutButton from "../LogoutButton"
import { IconChartHistogram, IconDeviceDesktopDollar, IconTruckLoading } from '@tabler/icons-react'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"



function SideBar({ session }: SideBarProps) {

  const { isOpen, setOpen, collapsed, setCollapsed } = useDrawerStore((state: any) => state)
  const { theme, setTheme } = useTheme()
  const [themeName, setThemeName] = useState("")


  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    if (theme === "dark") {
      setThemeName("Modo Oscuro")
    } else if (theme === "light") {
      setThemeName("Modo Claro")
    } else if (theme === "system") {
      setThemeName("Colores del Sistema")
    }
  }, [theme])



  return (
    <div id="sidebar" className={cn("fixed top-0 -left-full md:static md:flex flex-col justify-between h-full", session && "border-r border-accent bg-primary-foreground w-4/5 z-10 md:w-auto md:bg-primary-foreground md:dark:bg-[rgba(0,0,0,0.5)] transition-all", isOpen && "left-0", collapsed && "!w-fit")}>
      <div className={cn("transition-all", collapsed && "w-fit")}>
        <div className={cn("flex flex-col justify-between items-center gap-4 p-4 transition-all", collapsed && "py-4 px-2")}>
          <div className="relative flex flex-col items-center text-2xl">
            <PackageOpen width={40} height={40} />
            <span className={cn("font-bold text-3xl text-center", collapsed && "hidden")}>Control de Stock</span>
          </div>
          <X className="top-2 right-2 absolute md:hidden cursor-pointer" onClick={handleClick} />
          {collapsed ? <ArrowRightToLine onClick={handleCollapse} className="cursor-pointer" /> : <ArrowLeftToLine onClick={handleCollapse} className="cursor-pointer" />}
        </div>
        <div>
          <NavLink href="/" onClick={handleClick}>
            <Home />
            <span className={cn(collapsed && "hidden")}>Inicio</span>
          </NavLink>
          <NavLink href="/order" onClick={handleClick}>
            <ShoppingBasket />
            <span className={cn(collapsed && "hidden")}>Nueva Venta</span>
          </NavLink>
          <NavLink href="/cashRegisters" onClick={handleClick}>
            <IconDeviceDesktopDollar />
            <span className={cn(collapsed && "hidden")}>Cajas</span>
          </NavLink>
          <div className="bg-accent w-full h-[1px]" />
          <NavLink href="/products" onClick={handleClick}>
            <Barcode />
            <span className={cn(collapsed && "hidden")}>Productos</span>
          </NavLink>
          <NavLink href="/customers" onClick={handleClick}>
            <UserRound />
            <span className={cn(collapsed && "hidden")}>Clientes</span>
          </NavLink>
          <NavLink href="/providers" onClick={handleClick}>
            <Truck />
            <span className={cn(collapsed && "hidden")}>Proveedores</span>
          </NavLink>
          <NavLink href="/purchase-orders" onClick={handleClick}>
            <IconTruckLoading />
            <span className={cn(collapsed && "hidden")}>Ordenes de Compra</span>
          </NavLink>
          <div className="bg-accent w-full h-[1px]" />
          <NavLink href="/balance" onClick={handleClick}>
            <IconChartHistogram />
            <span className={cn(collapsed && "hidden")}>Balance</span>
          </NavLink>
          <NavLink href="/sales" onClick={handleClick}>
            <LineChart />
            <span className={cn(collapsed && "hidden")}>Ventas</span>
          </NavLink>
          {session?.user.isAdmin && (
            <>
              <NavLink href="/movements" onClick={handleClick}>
                <History />
                <span className={cn(collapsed && "hidden")}>Historial/Movimientos</span>
              </NavLink>
              <div className="bg-accent w-full h-[1px]" />
            </>
          )}
        </div>
        <div>
          {session?.user.isAdmin && (
            <NavLink href="/users" onClick={handleClick}>
              <Users />
              <span className={cn(collapsed && "hidden")}>Usuarios</span>
            </NavLink>
          )}
          <NavLink href="/account" onClick={handleClick}>
            <UserCogIcon />
            <span className={cn(collapsed && "hidden")}>Cuenta</span>
          </NavLink>
          <div className="flex items-center m-0 size-full" onClick={handleClick} >
            <ModeToggle theme={theme} setTheme={setTheme} themeName={themeName} collapsed={collapsed} cn={cn} />
          </div>
          {session && <LogoutButton collapsed={collapsed} />}
        </div>
      </div>
      <div className={cn("flex flex-col justify-center items-center gap-2 p-4 text-xs transition-all", collapsed && "hidden")}>
        <p className="text-muted-foreground">Control de Stock - version 1.2.1</p>
        <p className="text-muted-foreground">Desarrollado por:</p>
        <p className="text-muted-foreground">@horagutierrez - @ArturoGabrielRamirez</p>
      </div>
    </div>
  )
}

export default SideBar