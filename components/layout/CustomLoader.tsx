import { Loader } from "lucide-react";
import PageHeader from "./PageHeader";
import { CustomLoaderProps } from "@/lib/types";

export default function CustomLoader({ title = "Cargando" }: CustomLoaderProps) {
  return (
    <>
      <PageHeader title={title} />
      <div className="grow grid place-items-center">
        <Loader className="animate-spin" width={100} height={100} />
      </div>
    </>
  )
}