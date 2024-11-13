"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"
import { getHelpAccordion } from "@/actions/help/getHelpAccordion"
import { getAccordionContent } from "@/actions/help/getAccordionContent"

const HelpContext = createContext<any>(null)

export const HelpProvider = ({ children }: any) => {
  const [cardId, setCardId] = useState<string | undefined>(undefined)
  const [accordionId, setAccordionId] = useState<string | undefined>(undefined)
  const [headerCardsData, setHeaderCardsData] = useState<any>([])
  const [accordionData, setAccordionData] = useState<any>([])
  const [contentData, setContentData] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorHeaderCards, setErrorHeaderCards] = useState<string | null>(null)
  const [errorAccordion, setErrorAccordion] = useState<string | null>(null)

  const getCardsHeaders = async (cardId: string) => {
    setIsLoading(true)
    setErrorHeaderCards(null)
    setHeaderCardsData([])
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

  const getHelpAccordions = async (cardId: string) => {
    setIsLoading(true)
    setErrorAccordion(null)
    setAccordionData([])
    try {
      const { accordionData, error } = await getHelpAccordion(cardId)
      if (error) throw new Error(error)
      setAccordionData(accordionData)
    } catch (err: any) {
      setErrorAccordion(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getAccordionsContent = async (accordionId: string) => {
    setIsLoading(true)
    setErrorAccordion(null)
    setContentData([])
    try {
      const { contentData, error } = await getAccordionContent(accordionId)
      if (error) throw new Error(error)
      setContentData(contentData)
    } catch (err: any) {
      setErrorAccordion(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (cardId) {
      getCardsHeaders(cardId)
      getHelpAccordions(cardId)
    }
  }, [cardId])

  useEffect(() => {
    if (accordionId) {
      getAccordionsContent(accordionId)
    }
  }, [accordionId])


  return (
    <HelpContext.Provider value={{
      cardId,
      setCardId,
      headerCardsData,
      errorHeaderCards,
      isLoading,
      getCardsHeaders,
      getHelpAccordions,
      getAccordionsContent,
      accordionData,
      contentData,
      isOpen,
      setIsOpen,
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