import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUniqueStock = async (id: number) => {
  const stock = await prisma.estoques.findUnique({
    where: { id: Number(id) },
  });

  await prisma.$disconnect();

  return stock;
};
