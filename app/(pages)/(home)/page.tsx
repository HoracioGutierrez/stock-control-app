import { getStats } from "@/actions/getStats";
import { auth } from "@/auth";
import PageTitle from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducer, useState } from "react";

export default async function Home() {

  const session = await auth()
  const { data, error } = await getStats()

  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Inicio" />
        <meta name="au"/>
      </div>
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
