"use client"

import { LogOut } from "lucide-react"
import CustomButton from "./CustomButton"
import { signOut } from "next-auth/react"

function SidebarLogoutButton() {
  return (
    <CustomButton tooltip="Cerrar sesión" onClick={signOut} className="h-full" variant="outline">
      <LogOut />
    </CustomButton>
  )
}
export default SidebarLogoutButton