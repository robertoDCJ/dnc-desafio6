import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllProducts = async () => {
  const products = await prisma.produtos.findMany();
  await prisma.$disconnect();
  return products;
};
