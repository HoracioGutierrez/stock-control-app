import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {

  const privateUrls = [
    "/",
    "/products",
    "/order",
    "/customers",
    "/providers",
    "/sales",
    "/movements",
    "/cashRegisters",
    "/account",
  ]

  if(req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (!req.auth && privateUrls.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

})