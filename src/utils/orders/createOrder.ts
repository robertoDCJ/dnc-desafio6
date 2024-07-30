import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (produtos: Array<number>, client: number) => {
  await prisma.pedidos.create({
    data: {
      cliente_id: client,
      produtos: {
        connect: produtos.map((produto) => ({ id: Number(produto) })),
      },
    },
  });

  await prisma.$disconnect();
};
