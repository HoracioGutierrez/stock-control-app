"use server"

import { db, helpCardsContent } from "@/schema";
import { eq } from "drizzle-orm";

export const getAccordionContent = async (helpAccordionId: string): Promise<any> => {
  "use server";
  try {
    if (!helpAccordionId) {
      return {
        contentData: null,
        error: "Error al obtener el contenido de las tarjetas de ayuda",
        message: "Error al obtener el contenido de las tarjetas de ayuda"
      }
    } else {
      const contentData = await db
        .select(
          {
            id: helpCardsContent.id,
            helpAccordionId: helpCardsContent.helpAccordionId,
            icon: helpCardsContent.icon,
            description: helpCardsContent.description,
            subDescription: helpCardsContent.subDescription,
            image: helpCardsContent.image,
            warning: helpCardsContent.warning,
            subWarning: helpCardsContent.subWarning,
            warningDescription: helpCardsContent.warningDescription
          })
        .from(helpCardsContent)
        .where(eq(helpCardsContent.helpAccordionId, helpAccordionId))

      return {
        contentData,
        error: null,
        message: "success"
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        contentData: null,
        error: error.message,
        message: error.message
      }
    } else {
      return {
        contentData: null,
        error: "Error al obtener el contenido de las tarjetas de ayuda",
        message: "Error al obtener el contenido de las tarjetas de ayuda"
      }
    }
  }
}