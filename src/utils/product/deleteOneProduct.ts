import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteOneProduct = async (id: number) => {
  await prisma.produtos.delete({
    where: { id: Number(id) },
  });

  await prisma.estoques.delete({
    where: { id: Number(id) },
  });

  await prisma.$disconnect();
};
