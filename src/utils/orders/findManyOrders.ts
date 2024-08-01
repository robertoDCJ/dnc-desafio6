import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findManyOrders = async () => {
  const orders: Array<{ id: number; cliente_id: number }> =
    await prisma.pedidos.findMany({
      orderBy: {
        id: "asc",
      },
    });

  await prisma.$disconnect();

  return orders;
};
