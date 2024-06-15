import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex justify-between">
        <PageTitle title="Caja" />
        <Button>Cargando...</Button>
      </div>
      <div className="grow grid place-items-center">
        <Loader className="animate-spin" width={100} height={100} />
      </div>
    </>
  )
}