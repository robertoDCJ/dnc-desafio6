import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUniqueStock = async (id: number) => {
  const nameProduct = await prisma.produtos.findUnique({
    where: { id: Number(id) },
  });

  const stock = await prisma.estoques.findUnique({
    where: { id: Number(id) },
  });

  await prisma.$disconnect();

  return {
    id: stock?.id,
    nome: nameProduct?.nome,
    quantidade: stock?.quantidade,
  };
};
