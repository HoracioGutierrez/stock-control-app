import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      }
    })
  ]
} satisfies NextAuthConfig