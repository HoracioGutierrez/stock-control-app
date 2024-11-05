"use server";

import { db, helpCardsHeader, helpCards } from "@/schema";
import { eq } from "drizzle-orm";

export const getHelpCardsHeader = async (helpCardId: string): Promise<any> => {
  "use server";
  try {
    if (!helpCardId) {
      return {
        headerCardsData: null,
        error: "Error al obtener la información de los encabezados de las tarjetas de ayuda",
        message: "Error al obtener la información de los encabezados de las tarjetas de ayuda"
      }
    } else {
      const headerCardsData = await db
        .select(
          {
            id: helpCardsHeader.id,
            helpCardId: helpCardsHeader.helpCardId,
            icon: helpCardsHeader.icon,
            title: helpCardsHeader.title,
            description: helpCardsHeader.description
          })
        .from(helpCardsHeader)
        .where(eq(helpCardsHeader.helpCardId, helpCardId))

      return {
        headerCardsData,
        error: null,
        message: "success"
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        headerCardsData: null,
        error: error.message,
        message: error.message
      }
    } else {
      return {
        headerCardsData: null,
        error: "Error al obtener la información de los encabezados de las tarjetas de ayuda",
        message: "Error al obtener la información de los encabezados de las tarjetas de ayuda"
      }
    }
  }
}