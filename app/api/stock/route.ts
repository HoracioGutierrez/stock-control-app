import { createNewCashRegister } from "@/actions/createNewCashRegister";

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