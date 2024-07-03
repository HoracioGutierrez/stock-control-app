import { Loader } from "lucide-react";
import PageHeader from "./PageHeader";
import { CustomLoaderProps } from "@/lib/types";

export default function CustomLoader({ title = "Cargando" }: CustomLoaderProps) {
  return (
    <>
      <PageHeader title={title} goBack icon={<Loader className="w-5 lg:w-7 h-5 lg:h-7 text-muted-foreground animate-spin" />}/>
      <div className="place-items-center grid grow">
        <Loader className="animate-spin" width={100} height={100} />
      </div>
    </>
  )
}