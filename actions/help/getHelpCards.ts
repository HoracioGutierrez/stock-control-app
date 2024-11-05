"use server";

import { db, helpCards } from "@/schema";

export const getHelpCards = async (): Promise<any> => {
  "use server";
  try {
    const cardsData = await db
      .select(
        {
          id: helpCards.id,
          icon: helpCards.icon,
          title: helpCards.title,
          description: helpCards.description,
          createdAt: helpCards.createdAt
        })
      .from(helpCards)

    return {
      cardsData,
      error: null,
      message: "success"
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        cardsData: null,
        error: error.message,
        message: error.message
      }
    } else {
      return {
        cardsData: null,
        error: "Error al obtener la información de las tarjetas de ayuda",
        message: "Error al obtener la información de las tarjetas de ayuda"
      }
    }
  }
};
