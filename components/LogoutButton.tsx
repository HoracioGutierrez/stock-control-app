"use client"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="flex items-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors hover:cursor-pointer text-muted-foreground w-full hover:font-bold">
      <LogOut/>
      Logout
    </button>
  )
}
export default LogoutButton