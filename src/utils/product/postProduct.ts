import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function postProduct(nome: string, preco: number) {
  await prisma.produtos.create({ data: { nome, preco } });
  await prisma.estoques.create({ data: {} });

  await prisma.$disconnect();
}
