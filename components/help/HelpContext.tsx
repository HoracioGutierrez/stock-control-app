"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"

const HelpContext = createContext<any>(null)

export const HelpProvider = ({ children }: any) => {
  const [cardId, setCardId] = useState<string | undefined>(undefined)
  const [headerCardsData, setHeaderCardsData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorHeaderCards, setErrorHeaderCards] = useState<string | null>(null)

  const getCardsHeaders = async (cardId: string) => {
    setIsLoading(true)
    setErrorHeaderCards(null)
    try {
      const { headerCardsData, error } = await getHelpCardsHeader(cardId)
      if (error) throw new Error(error)
      setHeaderCardsData(headerCardsData)
    } catch (err: any) {
      setErrorHeaderCards(err.message)
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
    <HelpContext.Provider value={{ cardId, setCardId, headerCardsData, errorHeaderCards, isLoading, getCardsHeaders }}>
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