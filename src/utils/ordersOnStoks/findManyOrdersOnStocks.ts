import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findManyOrdersOnStocks = async (
  orders: Array<{ id: number; cliente_id: number }>
) => {
  const getItensOfOrders = await Promise.all(
    orders.map(async (order) => {
      return await prisma.pedidosOnEstoques.findMany({
        where: {
          pedido_id: order.id,
        },
        orderBy: {
          pedido_id: "asc",
        },
      });
    })
  );

  await prisma.$disconnect();

  return getItensOfOrders;
};
