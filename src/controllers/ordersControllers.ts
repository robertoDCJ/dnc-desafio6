import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  createOrder,
  findManyOrders,
  findManyOrdersOnStocks,
  findManyProducts,
  getClientByNameOrId,
} from "../utils";

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

    const [products, client] = await Promise.all(
      await [
        findManyProducts(products_id),
        getClientByNameOrId(client_id.toString()),
      ]
    );

    if (products && client) {
      await createOrder(client_id, products_id);
    }

    res.status(201).json("Pedido criado com sucesso!");
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ---------------- GET ALL ORDERS ----------------
//

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: Array<{ id: number; cliente_id: number }> =
      await findManyOrders();

    const getItensOfOrders = await findManyOrdersOnStocks(orders);

    res.status(200).json(getItensOfOrders);
  } catch (error) {
    res.status(400).json(error);
  }
};
