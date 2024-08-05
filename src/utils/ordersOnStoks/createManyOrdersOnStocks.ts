import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createManyOrdersOnStocks = async (
  pedidoId: number,
  ids: number[],
  quantity: number[]
) => {
  await prisma.pedidosOnEstoques.createMany({
    data: ids.map((id, index) => ({
      pedido_id: pedidoId,
      estoque_id: id,
      quantidade: quantity[index],
    })),
  });
};
