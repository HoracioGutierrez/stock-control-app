import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    username?: string | null
    password?: string | null
    isAdmin?: boolean
    createdAt?: Date | null
    updatedAt?: Date | null
  }

  interface Session {
    user: {
      username?: string
      password?: string
      isAdmin?: boolean
      createdAt?: Date
      updatedAt?: Date
      expires?: string
    } & DefaultSession["user"]
  }
}