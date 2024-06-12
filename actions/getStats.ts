import { GeneralResponse } from "@/lib/types";

export const getStats = async () : Promise<GeneralResponse> => {

  return {
    data: {
      productsLength: 10,
      ordersLength: 10
    },
    error: null,
    message: "Stats obtenido correctamente"
  }
}