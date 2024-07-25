import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientByNameOrId = async (idOrName: string) => {
  const clientId = Number(idOrName);
  const client = await prisma.clientes.findMany({
    where: {
      OR: [
        {
          id: isNaN(clientId) ? undefined : clientId,
        },
        {
          nome: idOrName,
        },
      ],
    },
  });

  await prisma.$disconnect();

  return client;
};
