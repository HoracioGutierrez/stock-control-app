import { auth } from "@/auth"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"

async function Header() {
  const session = await auth()

  return (
    <header className="p-4 flex justify-between">
      <h1 className="text-4xl font-bold">Control de Stock</h1>
      <nav className="gap-8 flex">
        {session ? <LogoutButton /> : <LoginButton />}
      </nav>
    </header>
  )
}
export default Header