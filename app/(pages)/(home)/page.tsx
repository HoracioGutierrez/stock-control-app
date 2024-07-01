import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { getStats } from "@/actions/getStats";
import { Line, LineChart } from "recharts"
import OrderChart from "@/components/home/OrderChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import CustomButton from "@/components/layout/CustomButton";
import SidebarLogoutButton from "@/components/layout/SidebarLogoutButton";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" />
      <section className="place-items-start gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 h-full">
        <Card className="col-span-1 xl:col-span-2 bg-primary-foreground w-full h-full">
          <CardHeader>
            <CardTitle>Información general</CardTitle>
          </CardHeader>
          <CardContent>
            {!error && (
              <>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">{data?.productsCount.count}</span> Productos en tu lista de productos
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">{data?.salesStats.count}</span> Ordenes en tu inventario
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">${data?.salesStats.value}</span> Total de ventas
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="flex flex-col xl:col-span-1 2xl:col-span-2 bg-primary-foreground w-full h-full">
          <CardHeader>
            <CardTitle>Accesos Directos</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-4 grow">
            <CustomButton href="/order" tooltip="Ver ordenes">
                <ShoppingBasket/>
            </CustomButton>

            <CustomButton href="/providers" tooltip="Ver proveedores">
                <ShoppingCart/>
            </CustomButton>

            <SidebarLogoutButton />

          </CardContent>
        </Card>
        <Card className="2xl:col-span-2 xl:col-span-1 bg-primary-foreground w-full h-full">
            <CardHeader>
                <CardTitle>Ultimas Deudas</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.customersWithDebt.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {data?.customersWithDebt.map((customer: any) => (
                    <div className="flex flex-col" key={customer.id}>
                      <p className="text-muted-foreground text-sm">Nombre: {customer.name}{`${customer.lastName ? ", " : ""}${customer.lastName ? customer.lastName : ""}`}</p>
                      <p className="text-muted-foreground text-sm">Saldo: ${customer.currentAmount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay clientes con deuda</p>
              )}
            </CardContent>
        </Card>
        <Card className="md:col-span-2 2xl:col-span-3 xl:col-span-2 row-start-2 bg-primary-foreground w-full h-full">
          <CardHeader>
            <CardTitle>Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderChart data={data?.salesFromDB} />
          </CardContent>
        </Card>
        <Card className="2xl:col-span-3 xl:col-span-3 bg-primary-foreground w-full h-full">
          <CardHeader>
            <CardTitle>Bloque en construcción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Esta sección aun no está disponible, pero lo esperamos pronto.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
