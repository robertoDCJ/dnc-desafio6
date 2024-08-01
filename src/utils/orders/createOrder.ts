import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (
  client_id: number,
  products_id: Array<{ id: number; quantidade: number }>
) => {
  await prisma.pedidos.create({
    data: {
      cliente_id: client_id,
      estoques: {
        create: products_id.map(({ id, quantidade }) => ({
          estoque: {
            connect: {
              id: id,
            },
          },
          quantidade: quantidade,
        })),
      },
    },
  });
};
