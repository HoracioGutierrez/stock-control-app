import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { getStats } from "@/actions/getStats";
import { Line, LineChart } from "recharts"
import OrderChart from "@/components/home/OrderChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpDown, HomeIcon, LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import CustomButton from "@/components/layout/CustomButton";
import SidebarLogoutButton from "@/components/layout/SidebarLogoutButton";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" icon={<HomeIcon className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} goBack />
      <section className="place-items-start gap-10 grid grid-cols-6 2xl:grid-cols-8">
        
        <Card className="col-span-6 sm:col-span-3 2xl:col-span-3 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4 md:pb-0">
            <CardTitle className="font-light text-base text-muted-foreground">Información general</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between p-3 md:p-4 h-[calc(100%_-_2.5rem)]">
            <p className="flex flex-col text-muted-foreground">
              <span className="font-bold text-4xl text-primary">${data?.salesStats.value ?? 0}</span> Total de ventas
            </p>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-4">
              <div className="border-muted-foreground p-2 border rounded-sm">
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="bg-accent rounded-full w-1 h-1"></div>
                  <span className="truncate">
                    Productos en inventario
                  </span>
                </p>
                <p className="font-bold text-2xl text-primary">{data?.productsCount.count}</p>
              </div>
              <div className="border-muted-foreground p-2 border rounded-sm">
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="bg-accent rounded-full w-1 h-1"></div>
                  <span className="truncate">
                    Compras hechas
                  </span>
                </p>
                <p className="font-bold text-2xl text-primary">{data?.salesStats.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col col-span-6 sm:col-span-3 lg:col-span-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Accesos Directos</CardTitle>
          </CardHeader>
          <CardContent className="justify-center items-center gap-4 grid grid-cols-2 grow">

            <CustomButton href="/order" tooltip="Ver ordenes" className="h-full" variant="outline">
              <ShoppingBasket />
            </CustomButton>

            <CustomButton href="/providers" tooltip="Ver proveedores" className="h-full" variant="outline">
              <ShoppingCart />
            </CustomButton>

            <SidebarLogoutButton />

            <CustomButton tooltip="Ingreso/Retiro Manual" className="h-full" variant="outline">
              <ArrowUpDown />
            </CustomButton>

          </CardContent>
        </Card>

        <Card className="col-span-6 sm:col-span-3 md:col-span-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Ultimas Deudas</CardTitle>
          </CardHeader>
          <CardContent className="gap-3 grid grid-cols-2 p-3 md:p-4">
            <p className="flex flex-col text-muted-foreground">
              <span className="font-bold text-4xl text-primary">${200}</span> Total de deuda
            </p>
            <div>
              {data?.customersWithDebt.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {data?.customersWithDebt.map((customer: any) => (
                    <div className="flex flex-col" key={customer.id}>
                      <p className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="bg-accent rounded-full w-1 h-1"></div>
                        <span className="truncate">
                          {customer.name}{`${customer.lastName ? ", " : ""}${customer.lastName ? customer.lastName : ""}`}
                        </span>
                      </p>
                      <p className="font-bold text-base text-red-400">${customer.currentAmount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay clientes con deuda</p>
              )}
            </div>
          </CardContent>
        </Card>


        <Card className="col-span-6 lg:col-span-4 xl:col-span-3 row-start-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Ventas</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <OrderChart data={data?.salesFromDB} />
          </CardContent>
        </Card>
        {/* 
        <Card className="2xl:col-span-3 xl:col-span-3 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Bloque en construcción</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <p className="text-muted-foreground">
              Esta sección aun no está disponible, pero lo esperamos pronto.
            </p>
          </CardContent>
        </Card> */}
      </section>
    </>
  );
}
