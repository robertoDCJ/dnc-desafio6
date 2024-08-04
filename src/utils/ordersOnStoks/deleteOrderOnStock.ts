import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteOrderOnStock = async (id: number) => {
  const orderOnStock = await prisma.pedidosOnEstoques.deleteMany({
    where: {
      pedido_id: id,
    },
  });
  return orderOnStock;
};
