import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postClient = async (nome: string) => {
  await prisma.clientes.create({ data: { nome } });
  await prisma.$disconnect();
};
