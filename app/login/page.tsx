import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Content from "@/components/layout/Content"
import LoginForm from "@/components/LoginForm"
import { PackageOpen } from "lucide-react"

function LoginPage() {
  return (
    <Content className="place-items-center place-content-center grid">
      <Card className="mx-auto max-w-sm" id="login-form">
        <CardHeader>
          <CardTitle className="flex flex-col items-center text-2xl">
            <PackageOpen width={40} height={40} />
            <span className="font-bold text-3xl text-center">Control de Stock</span>
          </CardTitle>
          <CardDescription className="pt-8 text-center">
            Ingresa tu nombre de usuario y contraseña para iniciar sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Content>
  )
}

export default LoginPage