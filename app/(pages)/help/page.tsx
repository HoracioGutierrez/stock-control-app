/* import { auth } from "@/auth" */
import PageHeader from "@/components/layout/PageHeader"
import { HelpCircle } from "lucide-react"
import HelpList from "@/components/help/HelpList"
import HelpSearchBar from "@/components/help/HelpSearchBar"
import HelpDialog from "@/components/help/HelpDialog"



export default async function HelpPage() {
  /* const session = await auth() */

  return (
    <>
      <PageHeader title="Ayuda" icon={<HelpCircle className="text-muted-foreground" />} goBack />
      <div className="flex flex-col p-2">
        <div className="flex flex-col p-2 bg-primary-foreground dark:bg-card rounded-lg">
          <h3 className="text-lg font-medium pl-4 pb-1">Bienvenido a la sección de ayuda</h3>
          <div className="flex flex-col justify-center items-center">
            <p className="text-muted-foreground">
              En esta sección encontrarás información sobre cómo utilizar la aplicación y cómo funciona. También encontrarás consejos y trucos para mejorar tu experiencia con la aplicación.
            </p>
            <HelpSearchBar />
          </div>
        </div>
        <HelpList />
      </div>
      <HelpDialog />
    </>)
}