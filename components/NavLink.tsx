"use client"

import { usePathname } from "next/navigation"

import Link from "next/link"

import { cn } from "@/lib/utils"

function NavLink({ href, children, activeClassName, className = "", ...props }: any) {
  const pathname = usePathname()

  const active = pathname === href

  return (
    <Link href={href} {...props} className={cn(
      "flex items-center gap-2 p-4 hover:bg-accent hover:font-bold hover:text-accent-foreground transition-colors hover:cursor-pointer text-muted-foreground",
      className,
      active && "bg-accent text-primary font-bold",
      (activeClassName && active) && activeClassName
    )} >
      {children}
    </Link>
  )
}

export default NavLink