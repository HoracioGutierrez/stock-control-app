import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Content from "@/components/Content"
import LoginForm from "@/components/LoginForm"

function LoginPage() {
  return (
    <Content className="grid place-items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
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