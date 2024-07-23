import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function showProducts() {
  const products = await prisma.produtos.findMany();
  const stocks = await prisma.estoques.findMany();

  const productsWithStock = products.map((product, index) => ({
    ...product,
    stock: stocks[index].quantidade,
  }));

  await prisma.$disconnect();

  return productsWithStock;
}
