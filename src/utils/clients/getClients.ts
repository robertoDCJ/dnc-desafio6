import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients = async () => {
  const clients = await prisma.clientes.findMany();

  await prisma.$disconnect();

  return clients;
};
