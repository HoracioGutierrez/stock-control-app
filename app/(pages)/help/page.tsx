import PageHeader from "@/components/layout/PageHeader"
import { HelpCircle } from "lucide-react"
import HelpContent from "@/components/help/HelpContent"
import HelpSearchBar from "@/components/help/HelpSearchBar"
import HelpDialog from "@/components/help/HelpDialog"



export default async function HelpPage() {

  return (
    <>
      <PageHeader title="Ayuda" icon={<HelpCircle className="text-muted-foreground" />} goBack />
      <div className="flex flex-col p-2">
        <div className="flex flex-col bg-primary-foreground dark:bg-card p-2 rounded-lg">
          <h3 className="pb-1 pl-4 font-medium text-lg">Bienvenido a la sección de ayuda</h3>
          <div className="flex flex-col justify-center items-center">
            <p className="text-muted-foreground">
              En esta sección encontrarás información sobre cómo utilizar la aplicación y cómo funciona. También encontrarás consejos y trucos para mejorar tu experiencia con la aplicación.
            </p>
            <HelpSearchBar />
          </div>
        </div>
        <HelpContent />
      </div>
      <HelpDialog />
    </>)
}