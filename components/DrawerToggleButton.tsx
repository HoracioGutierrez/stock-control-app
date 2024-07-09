"use client"

import { useDrawerStore } from "@/stores/drawerStore"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

function DrawerToggleButton() {

  const { isOpen, setOpen } = useDrawerStore((state: any) => state)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  return (
    <Menu onClick={handleClick} className="flex items-center gap-2 md:hidden cursor-pointer" />
  )
}

export default DrawerToggleButton