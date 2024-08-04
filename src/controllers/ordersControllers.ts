import { Request, Response } from "express";
import { redisClient } from "../redisConfig";
import { createOrder, findManyProducts, getClientByNameOrId } from "../utils";
import { findAndKeepOrders } from "../utils/orders/findAndKeepOrders";

//
// ---------------- CREATE ORDER ----------------
//

export const postOrder = async (req: Request, res: Response) => {
  const clientInstance = await redisClient;

  try {
    const {
      client_id,
      products_id,
    }: {
      client_id: number;
      products_id: Array<{ id: number; quantidade: number }>;
    } = req.body;

    await clientInstance.del("allOrders");

    const [products, client] = await Promise.all(
      await [
        findManyProducts(products_id),
        getClientByNameOrId(client_id.toString()),
      ]
    );

    if (products && client) {
      await createOrder(client_id, products_id);
      await findAndKeepOrders();
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
    const clientInstance = await redisClient;
    const verifyOrders = await clientInstance.get("allOrders");
    if (verifyOrders) {
      return res.status(200).json(JSON.parse(verifyOrders));
    }

    const result = await findAndKeepOrders();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ---------------- GET ONE ORDER ----------------
//

export const getOneOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const clientInstance = await redisClient;

  try {
    const jsonOrder = await clientInstance.get("oneOrder");
    if (jsonOrder) {
      const parseOrder = await JSON.parse(jsonOrder);
      if (parseOrder.id === Number(orderId)) {
        return res.status(200).json(parseOrder);
      }
    }

    const allOrders = await clientInstance.get("allOrders");
    if (allOrders) {
      const parseAllOrders: Array<{
        id: number;
        client: any;
        products: any[];
      }> = await JSON.parse(allOrders);
      const orderMap = new Map(
        parseAllOrders.map((order) => [order.id, order])
      );

      const order = orderMap.get(Number(orderId));
      if (order) {
        clientInstance.set("oneOrder", JSON.stringify(order));
        return res.status(200).json(order);
      }
    }

    res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(400).json(error);
  }
};
