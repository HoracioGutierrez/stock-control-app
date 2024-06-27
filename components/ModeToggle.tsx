"use client"
import { Cpu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggleProps } from "@/lib/types"

export function ModeToggle({ setTheme, themeName, collapsed, cn }: ModeToggleProps) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="m-0 border-none rounded-none size-full">
        <Button variant="ghost" className="justify-start gap-2 hover:bg-accent p-3 pl-3 border-none font-light hover:font-bold text-[1.2rem] text-muted-foreground text-sm hover:text-accent-foreground transition-colors hover:cursor-pointer size-full">
          <div className="flex items-center">
            <Sun className="transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </div>
          <span className={cn(collapsed && "hidden")} >{themeName}</span>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
