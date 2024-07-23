import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showStocks = async () => {
  const stocks = await prisma.estoques.findMany();
  const products = await prisma.produtos.findMany();

  const stoccksWithNameProducts = stocks.map((stock) => {
    const product = products.find((product) => product.id === stock.id);
    return {
      ...stock,
      nome: product?.nome,
    };
  });

  await prisma.$disconnect();

  return stoccksWithNameProducts;
};
