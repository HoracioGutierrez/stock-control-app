import PageHeader from "@/components/layout/PageHeader"
import { HelpCircle } from "lucide-react"
import HelpSearchBar from "@/components/help/HelpSearchBar"
import HelpDialog from "@/components/help/HelpDialog"
import { getHelpData } from "@/actions/help/getHelpData"
import CardList from "@/components/help/CardList"
import { getHelpCards } from "@/actions/help/getHelpCards"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"
import { HelpProvider, useHelpContext } from "@/components/help/HelpContext"
import CardListContainer from "@/components/help/CardListContainer"



export default async function HelpPage() {
  const { cardsData } = await getHelpCards()

  return (
    <>
      <HelpProvider>
        <PageHeader title="Ayuda" icon={<HelpCircle className="text-muted-foreground" />} goBack />
        <div className="flex flex-col justify-center items-center p-2">
          <div className="flex flex-col bg-primary-foreground dark:bg-card p-2 rounded-lg">
            <h3 className="pb-1 pl-4 font-medium text-2xl">Bienvenido a la sección de ayuda.</h3>
            <div className="flex flex-col justify-center items-center">
              <p className="p-2 text-muted-foreground text-sm">
                En esta sección encontrarás información sobre cómo utilizar la aplicación y cómo funciona. También encontrarás consejos y trucos para mejorar tu experiencia con la aplicación.
              </p>
              <HelpSearchBar />
            </div>
          </div>
          <CardListContainer cardsData={cardsData} />
        </div>
        <HelpDialog />
      </HelpProvider>
    </>)
}