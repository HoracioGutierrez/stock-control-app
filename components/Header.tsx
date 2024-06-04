import Link from "next/link"

function Header() {
  return (
    <header className="p-4 flex justify-between">
      <h1 className="text-4xl font-bold">Control de Stock</h1>
      <nav className="gap-8 flex">
        <Link href="/op-1">opcion 1</Link>
        <Link href="#/op-2">opcion 2</Link>
        <Link href="/op-3">opcion 3</Link>
      </nav>
    </header>
  )
}
export default Header