import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateClientById = async (id: number, nome: string) => {
  await prisma.clientes.update({
    where: {
      id: id,
    },
    data: {
      nome: nome,
    },
  });
};
