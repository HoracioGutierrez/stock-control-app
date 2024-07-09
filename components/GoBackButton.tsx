"use client"

import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

function GoBackButton() {

  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <Button variant={"outline"} className="aspect-square p-1" onClick={handleClick}>
      <ChevronLeft className="text-muted-foreground" width={20} height={20} />
    </Button>
  )
}
export default GoBackButton