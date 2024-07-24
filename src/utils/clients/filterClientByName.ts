import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const filterClientByName = async (name: string) => {
  const client = await prisma.clientes.findMany({
    where: {
      nome: {
        startsWith: `${name}`,
      },
    },
  });

  await prisma.$disconnect();

  return client;
};
