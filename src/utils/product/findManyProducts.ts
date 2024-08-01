import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findManyProducts = async (products_id: Array<{ id: number }>) => {
  const products = await prisma.produtos.findMany({
    where: {
      id: {
        in: products_id.map((product) => product.id),
      },
    },
  });

  await prisma.$disconnect();

  return products;
};
