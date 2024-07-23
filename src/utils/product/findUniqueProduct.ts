import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUniqueProduct = async (id: number) => {
  const product = await prisma.produtos.findUnique({
    where: { id: Number(id) },
  });

  await prisma.$disconnect();

  return product;
};
