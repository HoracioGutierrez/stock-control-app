"use server";

import { HelpData } from "@/components/help/types";
import { db, helpCards, helpCardsAccordion, helpCardsContent, helpCardsHeader } from "@/schema";
import { eq, desc, asc } from "drizzle-orm";


export const getHelpData = async (): Promise<{ data: HelpData[]; error: string | null; message: string }> => {
  try {
    const data = await db
      .select({
        cardId: helpCards.id,
        cardIcon: helpCards.icon,
        cardTitle: helpCards.title,
        cardDescription: helpCards.description,
        cardCreatedAt: helpCards.createdAt,
        headerId: helpCardsHeader.id,
        headerIcon: helpCardsHeader.icon,
        headerTitle: helpCardsHeader.title,
        headerDescription: helpCardsHeader.description,
        helpCardId: helpCardsHeader.helpCardId,
        accordionId: helpCardsAccordion.id,
        accordionTitle: helpCardsAccordion.title,
        accordionDescription: helpCardsAccordion.description,
        contentId: helpCardsContent.id,
        contentIcon: helpCardsContent.icon,
        contentDescription: helpCardsContent.description,
        contentSubDescription: helpCardsContent.subDescription,
      })
      .from(helpCards)
      .leftJoin(helpCardsHeader, eq(helpCardsHeader.helpCardId, helpCards.id))
      .leftJoin(helpCardsAccordion, eq(helpCardsAccordion.helpCardId, helpCards.id))
      .leftJoin(helpCardsContent, eq(helpCardsContent.helpAccordionId, helpCardsAccordion.id))
      .orderBy(asc(helpCards.createdAt));

    return { data, error: null, message: "Datos obtenidos con éxito" };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Error al obtener datos de ayuda";
    return { data: [], error: errorMsg, message: errorMsg };
  }
};