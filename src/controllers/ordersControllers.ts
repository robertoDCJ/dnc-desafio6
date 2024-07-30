import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//
// ---------------- CREATE ORDER ----------------
//

export const postOrder = async (req: Request, res: Response) => {
  try {
    const products_id: Array<number> = req.body.products_id;

    const client_id: number = req.body.client_id;

    const products: Array<{ id: number; nome: string; preco: number }> =
      await prisma.produtos.findMany({
        where: {
          id: {
            in: products_id,
          },
        },
      });

    const client = await prisma.clientes.findUnique({
      where: {
        id: client_id,
      },
    });

    if (products && client) {
      await prisma.pedidos.create({
        data: {
          cliente_id: client_id,
          estoques: {
            create: products_id.map((id) => ({
              estoque: {
                connect: {
                  id: id,
                },
              },
            })),
          },
        },
      });
    }

    res.status(201).json("Pedido criado com sucesso!");
  } catch (error) {
    res.status(400).json(error);
  }
};
