"use client"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

function LogoutButton({ collapsed }: { collapsed: boolean }) {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-2 hover:bg-accent p-4 w-full hover:font-bold text-muted-foreground hover:text-accent-foreground transition-colors hover:cursor-pointer">
      <LogOut />
      <span className={cn(collapsed && "hidden")}>Cerrar Sesión</span>
    </button>
  )
}
export default LogoutButton 