"use client"
import { IconPower } from "@tabler/icons-react"
import { signOut } from "next-auth/react"
import CustomButton from "./layout/CustomButton"

function LogoutButton({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 py-4 w-full">
      <CustomButton variant="ghost" className="p-2 h-fit" onClick={() => signOut()}>
        <IconPower />
      </CustomButton>
      <p className="text-muted-foreground text-sm">Salir</p>
    </div>
  )
}
export default LogoutButton 