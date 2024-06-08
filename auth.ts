import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./schema"
import { getUser } from "./actions/getUser"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { data, error } = await getUser(credentials.username as string)
  
        if(data?.password !== credentials.password) return null

        if (data === null) return null

        if (error) return null

        return {
          ...data
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const { data, error } = await getUser(session.user.email as string)

      if (data === null) return session

      if (error) return session

      session.user.username = data.username as string
      session.user.isAdmin = data.isAdmin as boolean
      session.user.name = data.name as string
      return session
    }
  },
  pages : {
    error: "/",
  }
})