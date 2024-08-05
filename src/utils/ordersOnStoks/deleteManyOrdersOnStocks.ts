import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteManyOrdersOnStocks = async (id: number) => {
  await prisma.pedidosOnEstoques.deleteMany({
    where: {
      pedido_id: id,
    },
  });

  await prisma.$disconnect();
};
