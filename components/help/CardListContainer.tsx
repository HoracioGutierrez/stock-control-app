"use client"

import { useEffect, useState } from "react"
import { getHelpCardsHeader } from "@/actions/help/getHelpCardsHeader"
import CardList from "./CardList"
import { useHelpContext } from "./HelpContext"

function CardListContainer({ cardsData }: any) {

  return (
    <>
      <CardList cardsData={cardsData} />
    </>
  )
}

export default CardListContainer