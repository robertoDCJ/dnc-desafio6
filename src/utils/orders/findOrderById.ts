import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findOrderById = async (id: number) => {
  const order = await prisma.pedidos.findUnique({
    where: {
      id: id,
    },
    // include: {
    //   estoques: true,
    // },
  });

  await prisma.$disconnect();
  return order;
};
