"use client"
import { ModeToggleProps } from "@/lib/types"
import { Switch } from "./ui/switch"
import { useTheme } from "next-themes"

export function ModeToggle({ collapsed }: ModeToggleProps) {

  const { theme, setTheme } = useTheme()

  const modes: Record<string, string> = {
    "light": "modo claro",
    "dark": "modo oscuro",
    "system": "Colores del Sistema",
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 py-4 w-full">
      <div className="place-content-center grid h-[40px]">
        <Switch onCheckedChange={(value) => setTheme(value ? "dark" : "light")} />
      </div>
      <p className="text-muted-foreground text-sm">{modes[theme as string || "dark"]}</p>
    </div>
  )
}
