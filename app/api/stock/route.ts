import { createNewCashRegister } from "@/actions/createNewCashRegister";
import { getAllCashRegisters } from "@/actions/getAllCashRegisters";

export async function POST(request: Request) {

  try {
    const { data: cashRegister, userId } = await request.json();

    const { data, error } = await createNewCashRegister(cashRegister, userId);

    if (error) throw new Error(error);

    return Response.json({
      data: data,
      error: null,
      message: "Caja creada correctamente"
    })

  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 400,
      });
    }

    return new Response("Error al crear la caja", {
      status: 500,
    });
  }
}

export async function GET(request: Request) {

  try {
    const { data, error } = await getAllCashRegisters();

    if (error) throw new Error(error);

    return Response.json({
      data: data,
      error: null,
      message: "Cajas encontradas"
    })

  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 400,
      });
    }

    return new Response("Error al obtener las cajas", {
      status: 500,
    });
  }
}