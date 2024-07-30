import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteClientById = async (id: string) => {
  await prisma.clientes.delete({
    where: {
      id: Number(id),
    },
  });

  await prisma.$disconnect();
};
