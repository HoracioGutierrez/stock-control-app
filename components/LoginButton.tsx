"use client"
import { signIn } from "next-auth/react"

function LoginButton() {

  const handleClick = async () => {
    await signIn()
  }

  return (
    <button onClick={handleClick}>login</button>
  )
}
export default LoginButton