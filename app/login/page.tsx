import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Content from "@/components/Content"
import LoginForm from "@/components/LoginForm"
import { PackageOpen } from "lucide-react"

function LoginPage() {
  return (
    <Content className="grid place-items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex flex-col items-center">
            <PackageOpen width={40} height={40} />
            <span className="text-3xl font-bold text-center">Control de Stock</span>
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