import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { getStats } from "@/actions/getStats";
import { Line, LineChart } from "recharts"
import OrderChart from "@/components/home/OrderChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import CustomButton from "@/components/layout/CustomButton";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" />
      <section className="place-items-start gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <Card className="col-span-1 xl:col-span-2 bg-primary-foreground w-full">
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

            <CustomButton href="/logout" tooltip="Cerrar sesión">
                <LogOut/>
            </CustomButton>

          </CardContent>
        </Card>
        <div></div>
        <Card className="md:col-span-2 2xl:col-span-3 xl:col-span-2 row-start-2 bg-primary-foreground w-full">
          <CardHeader>
            <CardTitle>Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderChart data={data?.salesFromDB} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
