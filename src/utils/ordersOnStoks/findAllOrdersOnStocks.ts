import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllOrdersOnStocks = async () => {
  const ordersOnStocks = await prisma.pedidosOnEstoques.findMany();

  await prisma.$disconnect;

  return ordersOnStocks;
};
