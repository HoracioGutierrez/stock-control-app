"use server";

import { db, helpCardsAccordion } from "@/schema";
import { eq } from "drizzle-orm";

export const getHelpAccordion = async (helpCardId: string): Promise<any> => {
  "use server";
  try {
    if (!helpCardId) {
      return {
        accordionData: null,
        error: "Error al obtener la información de las tarjetas de ayuda",
        message: "Error al obtener la información de las tarjetas de ayuda"
      }
    } else {
      const accordionData = await db
        .select(
          {
            id: helpCardsAccordion.id,
            helpCardId: helpCardsAccordion.helpCardId,
            title: helpCardsAccordion.title,
            description: helpCardsAccordion.description
          })
        .from(helpCardsAccordion)
        .where(eq(helpCardsAccordion.helpCardId, helpCardId))

      return {
        accordionData,
        error: null,
        message: "success"
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        accordionData: null,
        error: error.message,
        message: error.message
      }
    } else {
      return {
        accordionData: null,
        error: "Error al obtener la información de las tarjetas de ayuda",
        message: "Error al obtener la información de las tarjetas de ayuda"
      }
    }
  }
}