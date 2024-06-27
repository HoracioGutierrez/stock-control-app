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
      <DropdownMenuTrigger asChild className="rounded-none size-full m-0 border-none">
        <Button variant="ghost" className="size-full border-none p-4 gap-2 pl-4 justify-start hover:bg-accent hover:font-bold text-muted-foreground hover:text-accent-foreground transition-colors hover:cursor-pointer text-[1.2rem] font-light">
          <div className="flex items-center">
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
