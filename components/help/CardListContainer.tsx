"use client"

import { useEffect, useState } from "react"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"
import CardList from "./CardList"
import { useHelpContext } from "./HelpContext"

function CardListContainer({ cardsData }: any) {
  const { cardId, headerCardsData, errorHeaderCards, isLoading, getCardsHeaders } = useHelpContext()

  console.log("headerCardsData", headerCardsData, cardsData)

  return (
    <>
      <CardList cardsData={cardsData} />
    </>
  )
}

export default CardListContainer