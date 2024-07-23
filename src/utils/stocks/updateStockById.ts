import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateStockById = async (id: number, quantidade: number) => {
  await prisma.estoques.update({
    where: { id: Number(id) },
    data: { quantidade },
  });

  await prisma.$disconnect();
};
