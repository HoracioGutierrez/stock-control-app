import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { getStats } from "@/actions/getStats";

export default async function Home() {

  const { data, error } = await getStats()

  return (
    <>
      <PageHeader title="Inicio" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>Información general</CardTitle>
          </CardHeader>
          <CardContent>
            {!error && (
              <>
                <p className="text-muted-foreground">
                  <span className="text-primary font-bold text-2xl">{data?.productsLength}</span> productos en tu inventario
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary font-bold text-2xl">{data?.ordersLength}</span> ordenes en tu inventario
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
