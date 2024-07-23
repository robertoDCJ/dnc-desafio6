import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateOneProduct = async (
  id: number,
  nome: string,
  preco: number
) => {
  await prisma.produtos.update({
    where: { id: Number(id) },
    data: { nome, preco },
  });

  await prisma.$disconnect();
};
