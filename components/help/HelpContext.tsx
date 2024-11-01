"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"
import { getHelpAccordion } from "@/actions/help/getHelpAccordion"

const HelpContext = createContext<any>(null)

export const HelpProvider = ({ children }: any) => {
  const [cardId, setCardId] = useState<string | undefined>(undefined)
  const [accordionId, setAccordionId] = useState<string | undefined>(undefined)
  const [headerCardsData, setHeaderCardsData] = useState<any>([])
  const [accordionData, setAccordionData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorHeaderCards, setErrorHeaderCards] = useState<string | null>(null)
  const [errorAccordion, setErrorAccordion] = useState<string | null>(null)

  const getCardsHeaders = async (cardId: string) => {
    setIsLoading(true)
    setErrorHeaderCards(null)
    try {
      const { headerCardsData, error } = await getHelpCardsHeader(cardId)
      const { accordionData, accordionError } = await getHelpAccordion(cardId)
      if (error) throw new Error(error || accordionError)
      setHeaderCardsData(headerCardsData)
      setAccordionData(accordionData)
    } catch (err: any) {
      setErrorHeaderCards(err.message)
      setErrorAccordion(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (cardId) {
      getCardsHeaders(cardId)
      console.log("headerCardsData", headerCardsData)
    }
  }, [cardId])

  return (
    <HelpContext.Provider value={{
      cardId,
      setCardId,
      headerCardsData,
      errorHeaderCards,
      isLoading,
      getCardsHeaders,
      accordionData,
      errorAccordion,
      accordionId,
      setAccordionId
    }}>
      {children}
    </HelpContext.Provider>
  )
}

export const useHelpContext = () => {
  const context = useContext(HelpContext)
  if (context === undefined) {
    throw new Error("useHelpContext must be used within a HelpProvider")
  }
  return context
}