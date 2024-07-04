"use client"
import { ArrowLeftToLine, ArrowRightToLine, Barcode, History, Home, LineChart, PackageOpen, ShoppingBasket, Truck, UserCogIcon, UserRound, Users, X, Computer, Store, Settings, UserCircle2Icon } from "lucide-react"
import { IconChartHistogram, IconDeviceDesktopDollar, IconEngine, IconTruckLoading, IconHelpCircleFilled, IconHelpCircle } from '@tabler/icons-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { useDrawerStore } from "@/stores/drawerStore"
import { ModeToggle } from "../ModeToggle"
import { SideBarProps } from "@/lib/types"
import LogoutButton from "../LogoutButton"
import NavLink from "../NavLink"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


function SideBar({ session }: SideBarProps) {

  const pathname = usePathname()


  const { isOpen, setOpen, collapsed, setCollapsed } = useDrawerStore((state: any) => state)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }


  return (
    <aside id="sidebar" /* className={cn("overflow-auto  md:flex flex-col justify-between", session && "border-r border-accent bg-primary-foreground w-4/5 z-10 md:w-auto transition-all", isOpen && "left-0", collapsed && "!w-fit")} */ className={cn(
      "min-h-[calc(100%_-_2rem)] self-center w-[calc(100%_-_2rem)] justify-self-center rounded-lg bg-primary-foreground md:bg-primary-foreground md:dark:bg-[rgba(0,0,0,0.7)] fixed md:static top-0 -left-full md:flex md:flex-col md:justify-between transition-all"
    )}>
      <div className={cn("transition-all", collapsed && "w-fit")}>
        <div className={cn("flex flex-col justify-between items-center gap-4 p-4 py-10 transition-all", collapsed && "py-4 px-2 pt-10")}>
          <div className="relative flex items-center gap-2">
            <PackageOpen width={25} height={25} />
            <span className={cn("font-bold text-xl text-center", collapsed && "hidden")}>Stock Control</span>
          </div>
          <X className={cn("top-2 right-2 absolute md:hidden cursor-pointer", collapsed && "right-50")} onClick={handleClick} />
          {/* {collapsed ? <ArrowRightToLine onClick={handleCollapse} className="cursor-pointer" /> : <ArrowLeftToLine onClick={handleCollapse} className="cursor-pointer" />} */}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <NavLink href="/" onClick={handleClick}>
            <Home width={22} height={22} />
            <span className={cn(collapsed && "hidden")}>Inicio</span>
          </NavLink>
          <Accordion type="single" collapsible className="flex flex-col gap-2" defaultValue="item-1">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Computer width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Cajas</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 max-w-[200px]">
                <NavLink href="/order" onClick={handleClick}>
                  <ShoppingBasket width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Nueva Venta</span>
                </NavLink>
                <NavLink href="/cashRegisters" onClick={handleClick}>
                  <IconDeviceDesktopDollar width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Cajas</span>
                </NavLink>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="p-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Proveedores</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 max-w-[200px]">
                <NavLink href="/providers" onClick={handleClick}>
                  <Truck width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Proveedores</span>
                </NavLink>
                <NavLink href="/purchase-orders" onClick={handleClick}>
                  <IconTruckLoading width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Ordenes de Compra</span>
                </NavLink>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="p-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Store width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Tienda</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 max-w-[200px]">
                <NavLink href="/products" onClick={handleClick}>
                  <Barcode width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Productos</span>
                </NavLink>
                <NavLink href="/customers" onClick={handleClick}>
                  <UserRound width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Clientes</span>
                </NavLink>
                <NavLink href="/sales" onClick={handleClick}>
                  <LineChart width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Ventas</span>
                </NavLink>
                <NavLink href="/balance" onClick={handleClick}>
                  <IconChartHistogram width={22} height={22} />
                  <span className={cn(collapsed && "hidden")}>Balance</span>
                </NavLink>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="p-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserCircle2Icon />
                  <span className={cn(collapsed && "hidden")}>Cuenta</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 max-w-[200px]">
                {session?.user.isAdmin && (
                  <NavLink href="/movements" onClick={handleClick}>
                    <History />
                    <span className={cn(collapsed && "hidden")}>Historial</span>
                  </NavLink>
                )}
                {session?.user.isAdmin && (
                  <NavLink href="/users" onClick={handleClick}>
                    <Users />
                    <span className={cn(collapsed && "hidden")}>Usuarios</span>
                  </NavLink>
                )}
                <NavLink href="/account" onClick={handleClick}>
                  <UserCogIcon />
                  <span className={cn(collapsed && "hidden")}>Configuracion</span>
                </NavLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <NavLink href="/help">
            {pathname === "/help" ? <IconHelpCircleFilled /> : <IconHelpCircle />}
            <span className={cn(collapsed && "hidden")}>Ayuda</span>
          </NavLink>
        </div>
      </div>
      <div>
        <div className="place-items-center grid grid-cols-2 px-4">
          {session && <LogoutButton collapsed={collapsed} />}
          <ModeToggle />
        </div>
        <div className={cn("flex flex-col justify-center items-center gap-2 p-4 text-xs transition-all", collapsed && "hidden")}>
          <div className="flex flex-col gap-2">
            <p className="text-center text-muted-foreground">Desarrollado por:</p>
            <p className="text-center text-muted-foreground">@horagutierrez - @ArturoGabrielRamirez</p>
          </div>
          <p className="text-muted-foreground">Stock Control - version 1.2.5</p>
        </div>
      </div>
    </aside>
  )
}

export default SideBar