"use client"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { IconZoomQuestion } from "@tabler/icons-react"

function HelpSearchBar() {


  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div className="flex items-center gap-2 w-full">
        <Input placeholder="Buscar..." type="text" className="bg-accent dark:bg-primary-foreground" />
        <Button variant="outline" className="transition-transform hover:scale-[1.03] active:scale-[0.98] duration-10 p-2 gap-1 text-muted-foreground active:text-muted-foreground bg-accent dark:bg-primary-foreground">
          <IconZoomQuestion className="w-5 text-muted-foreground dark:text-muted-foreground hover:te active:text-muted-foreground" />
          <span className="text-muted-foreground dark:text-muted-foreground">Buscar</span>
        </Button>
      </div>
    </div>
  )
}
export default HelpSearchBar