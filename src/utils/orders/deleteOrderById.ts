import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteOrderById = async (id: number) => {
  const order = await prisma.pedidos.delete({
    where: {
      id,
    },
  });

  return order;
};
