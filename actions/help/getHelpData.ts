"use server";

/* import { HelpResponse } from "@/lib/types"; */
import { db, helpCards, helpCardsAccordion, helpCardsContent, helpCardsHeader } from "@/schema";
import { eq, desc, asc } from "drizzle-orm";

export const getHelpData = async (): Promise<any> => {
  "use server";
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
      .orderBy(helpCards.createdAt ? asc(helpCardsContent.id) : desc(helpCardsHeader.id))

      
    return { data, error: null, message: "success" };

  } catch (error) {
    if (error instanceof Error) {
      return {
        data: null,
        error: error.message,
        message: error.message,
      };
    }

    return {
      data: null,
      error: "Error al obtener los datos de ayuda",
      message: "Error al obtener los datos de ayuda",
    };
  }
};