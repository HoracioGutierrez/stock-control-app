import { ArrowUpDown, Barcode, HomeIcon, LogOut, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SidebarLogoutButton from "@/components/layout/SidebarLogoutButton";
import CustomButton from "@/components/layout/CustomButton";
import PageHeader from "@/components/layout/PageHeader";
import OrderChart from "@/components/home/OrderChart";
import { getStats } from "@/actions/getStats";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" icon={<HomeIcon className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground" />} goBack />
      <section className="place-items-start gap-4 xl:gap-6 grid grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">

        <Card className="col-span-6 sm:col-span-3 md:col-span-4 xl:col-span-3 2xl:col-span-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4 md:pb-0">
            <CardTitle className="font-light text-base text-muted-foreground">Información general</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between p-3 md:p-4 h-[calc(100%_-_3rem)] xl:h-[calc(100%_-_2.5rem)]">
            <p className="flex flex-col text-muted-foreground">
              <span className="font-bold text-4xl text-primary">${data?.salesStats?.value ?? 0}</span> Total de ventas
            </p>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-4">
              <div className="border-muted-foreground p-2 border rounded-sm">
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="bg-accent rounded-full w-1 h-1"></span>
                  <span className="truncate">
                    Productos en inventario
                  </span>
                </p>
                <p className="font-bold text-2xl text-primary">{data?.productsCount?.count}</p>
              </div>
              <div className="border-muted-foreground p-2 border rounded-sm">
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="bg-accent rounded-full w-1 h-1"></span>
                  <span className="truncate">
                    Compras hechas
                  </span>
                </p>
                <p className="font-bold text-2xl text-primary">{data?.salesStats?.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
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

        <Card className="col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-2 xl:row-start-1 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Ultimas Deudas</CardTitle>
          </CardHeader>
          <CardContent className="gap-3 grid grid-cols-2 p-3 md:p-4">
            <p className="flex flex-col text-muted-foreground">
              <span className="font-bold text-4xl text-primary">${data?.totalDebt}</span> Total de deuda
            </p>
            <div>
              {data?.customersWithDebt?.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {data?.customersWithDebt.map((customer: any) => (
                    <div className="flex flex-col" key={customer.id}>
                      <p className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span className="bg-accent rounded-full w-1 h-1"></span>
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

        <Card className="col-span-6 sm:col-span-3 lg:col-span-2 lg:row-start-2 xl:row-start-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Top Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 h-[calc(100%_-_3.5rem)]">
            <div className="flex flex-col gap-4 h-full">
              {data?.topCustomers?.map((customer: any) => {
                return (
                  <article className="border-muted-foreground p-2 border rounded-md" key={customer.id}>
                    <div className="flex justify-between gap-2 pb-2 w-full">
                      <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 font-bold text-lg">
                          <User />
                          {customer.name} {customer.lastName ? "," : ""} {customer.lastName ? customer.lastName : ""}
                        </p>
                      </div>
                      <p className="flex flex-col truncate leading-none">
                        <span className="text-muted-foreground text-xs">lleva gastado </span>
                        <span className="font-bold text-green-400">${customer.spentAmount}</span>
                      </p>
                    </div>
                  </article>
                )
              })}
              {data?.topCustomers?.length < 2 && (
                <article className="flex-grow place-content-center border-muted-foreground grid p-2 border border-dashed rounded-md">
                  <p className="max-w-44 text-center text-muted-foreground">Aun faltan mas ventas para generar el ranking</p>
                </article>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-6 sm:col-span-3 xl:col-span-2 bg-primary-foreground dark:bg-card w-full h-full transition-transform hover:scale-[1.02]">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="font-light text-base text-muted-foreground">Productos con stock bajo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-3 md:p-4">
            {data?.outOfStockProducts?.map((product: any) => {
              return (
                <article className="border-muted-foreground p-2 border rounded-md" key={product.id}>
                  <div className="flex justify-between items-center gap-2 pb-2 w-full">
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-2 font-bold text-lg text-red-400">
                        <Barcode />
                        {product.name} {product.lastName ? "," : ""} {product.lastName ? product.lastName : ""}
                      </p>
                    </div>
                    <p className="flex flex-col truncate leading-none">
                      <span className="text-right font-bold text-lg text-red-400">{product.stock}</span>
                      <span className="text-muted-foreground text-xs">Stock </span>
                    </p>
                  </div>
                </article>
              )
            })}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
