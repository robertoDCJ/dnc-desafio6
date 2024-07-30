import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLastOrder = async () => {
  const order = await prisma.pedidos.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  await prisma.$disconnect();

  return order;
};
