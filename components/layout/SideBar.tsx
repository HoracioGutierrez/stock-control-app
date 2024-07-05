"use client"
import { ArrowLeftToLine, ArrowRightToLine, Barcode, History, Home, LineChart, PackageOpen, ShoppingBasket, Truck, UserCogIcon, UserRound, Users, X, Computer, Store, Settings, UserCircle2Icon, HelpCircle } from "lucide-react"
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

  const { isOpen, setOpen, collapsed, setCollapsed } = useDrawerStore((state: any) => state)
  const pathname = usePathname()

  const paths: Record<string, string> = {
    "/order": "item-1",
    "/cashRegisters": "item-1",
    "/providers": "item-2",
    "/purchase-orders": "item-2",
    "/products": "item-3",
    "/customers": "item-3",
    "/sales": "item-3",
    "/balance": "item-3",
    "/movements": "item-4",
    "/users": "item-4",
    "/account": "item-4",
  }

  const openedItem = paths["/" + pathname.split("/")[1]]


  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }


  return (
    <>
      <div className={cn(
        "md:hidden h-full w-full fixed top-0 left-0 backdrop-blur-sm pointer-events-none opacity-0",
        isOpen && "pointer-events-auto opacity-100 z-10"
      )}
        onClick={handleClick}
      ></div>
      <aside id="sidebar" className={cn(
        "h-full md:h-[calc(100%_-_2rem)] self-center w-5/6 md:w-[calc(100%_-_2rem)] justify-self-center md:rounded-lg bg-primary-foreground md:bg-primary-foreground dark:bg-card fixed md:static top-0 -left-full md:flex md:flex-col md:justify-between transition-all sm:w-3/5",
        isOpen && "left-0 z-20"
      )}>

        <div className={cn("transition-all", collapsed && "w-full")}>
          <div className={cn("flex flex-col justify-between items-center gap-4 p-4 py-10 transition-all", collapsed && "py-4 px-2 pt-10")}>
            <div className="relative flex items-center gap-2">
              <PackageOpen width={25} height={25} />
              <span className={cn("font-bold text-xl text-center", collapsed && "hidden")}>Stock Control</span>
            </div>
            <X className={cn("top-2 right-2 absolute md:hidden cursor-pointer", collapsed && "right-50")} onClick={handleClick} />
            {collapsed ? <ArrowRightToLine onClick={handleCollapse} className="cursor-pointer" /> : <ArrowLeftToLine onClick={handleCollapse} className="cursor-pointer" />}
          </div>
          <div className="flex flex-col gap-2 p-4">
            <NavLink href="/" onClick={handleClick}>
              <Home width={22} height={22} />
              <span className={cn(collapsed && "hidden")}>Inicio</span>
            </NavLink>
            <Accordion type="single" collapsible className="flex flex-col gap-2" defaultValue={openedItem}>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className={cn("p-3 text-muted-foreground", collapsed && "pl-2")}>
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
                <AccordionTrigger className={cn("p-3 text-muted-foreground", collapsed && "pl-2")}>
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
                <AccordionTrigger className={cn("p-3 text-muted-foreground", collapsed && "pl-2")}>
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
                <AccordionTrigger className={cn("p-3 text-muted-foreground", collapsed && "pl-2")}>
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
            <NavLink href="/help" onClick={handleClick}>
              <HelpCircle width={22} height={22} />
              <span className={cn(collapsed && "hidden")}>Ayuda</span>
            </NavLink>
          </div>
        </div>
        <div>
          <div className={cn("place-items-center grid grid-cols-2 px-4", collapsed && "grid-cols-1")}>
            {session && <LogoutButton collapsed={collapsed} />}
            <ModeToggle />
          </div>
          <div className={cn("flex flex-col justify-center items-center gap-2 p-4 text-xs transition-all", collapsed && "hidden")}>
            <div className="flex flex-col gap-2">
              <p className="text-center text-muted-foreground">Desarrollado por:</p>
              <p className="text-center text-muted-foreground">@horagutierrez - @ArturoGabrielRamirez</p>
            </div>
            <p className="text-muted-foreground">Stock Control - version 1.3.3</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar