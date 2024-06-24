import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { getStats } from "@/actions/getStats";
import { Line, LineChart } from "recharts"
import OrderChart from "@/components/home/OrderChart";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" />
      <div className="gap-4 grid grid-cols-1 2xl:grid-cols-2">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Información general</CardTitle>
          </CardHeader>
          <CardContent>
            {!error && (
              <>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">{data?.productsCount.count}</span> productos en tu inventario
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">{data?.salesStats.count}</span> ordenes en tu inventario
                </p>
                <p className="text-muted-foreground">
                  <span className="font-bold text-2xl text-primary">${data?.salesStats.value}</span> total de ventas
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <OrderChart data={data?.salesFromDB} />
      </div>
    </>
  );
}
