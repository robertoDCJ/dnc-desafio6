import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createOrder, getClientByNameOrId } from "../utils";

const prisma = new PrismaClient();

//
// ---------------- CREATE ORDER ----------------
//

export const postOrder = async (req: Request, res: Response) => {
  try {
    const {
      client_id,
      products_id,
    }: {
      client_id: number;
      products_id: Array<{ id: number; quantidade: number }>;
    } = req.body;

    // TODO: Do a function to get products by id
    const products: Array<{ id: number; nome: string; preco: number }> =
      await prisma.produtos.findMany({
        where: {
          id: {
            in: products_id.map(({ id }) => id),
          },
        },
      });

    const client = await getClientByNameOrId(client_id.toString());

    if (!products || !client) {
      return res.status(400).json("Produtos ou cliente não encontrado");
    }

    if (products && client) {
      await createOrder(client_id, products_id);
    }

    res.status(201).json("Pedido criado com sucesso!");
  } catch (error) {
    res.status(400).json(error);
  }
};
