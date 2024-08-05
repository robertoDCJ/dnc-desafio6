import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { redisClient } from "../redisConfig";
import {
  createOrder,
  deleteOrderById,
  deleteOrderOnStock,
  findManyProducts,
  getClientByNameOrId,
} from "../utils";
import { findAndKeepOrders } from "../utils/orders/findAndKeepOrders";
import { findAndKeepStocks } from "../utils/stocks/findAndKeepStocks";

const prisma = new PrismaClient();

findAndKeepOrders();
findAndKeepStocks();

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

    // Verify if there are enough products in stock
    const allStocks = await clientInstance.get("allStocks");
    if (allStocks) {
      const parseAllStocks: { id: number; quantidade: number; nome: string }[] =
        await JSON.parse(allStocks);
      const stockMap = new Map(
        parseAllStocks.map((stock) => [stock.id, stock])
      );

      const verifyStocks = products_id.map((product) => {
        const stock = stockMap.get(product.id);
        if (stock) {
          if (stock.quantidade < product.quantidade) {
            return false;
          }
          return true;
        }
      });

      if (verifyStocks.includes(false)) {
        return res.status(400).json("Quantidade de estoque insuficiente!");
      }
    }

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
      const parseOrder: {
        id: number;
        client: {
          id: number;
          nome: string;
        };
        products: {
          id: number;
          name: string;
          preco: number;
          quantity: number;
        }[];
      } = await JSON.parse(jsonOrder);
      if (parseOrder.id === Number(orderId)) {
        return res.status(200).json(parseOrder);
      }
    }

    const allOrders = await clientInstance.get("allOrders");
    if (allOrders) {
      const parseAllOrders: Array<{
        id: number;
        client: {
          id: number;
          nome: string;
        };
        products: {
          id: number;
          name: string;
          preco: number;
          quantity: number;
        }[];
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

//
// ---------------- DELETE ORDER ----------------
//

export const deleteOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const clientInstance = await redisClient;

  try {
    const allOrders = await clientInstance.get("allOrders");
    if (allOrders) {
      const parseAllOrders: {
        id: number;
        client: { id: number; nome: string };
        products: {
          id: number;
          name: string;
          preco: number;
          quantity: number;
        }[];
      }[] = await JSON.parse(allOrders);
      const orderMap = new Map(
        parseAllOrders.map((order) => [order.id, order])
      );
      const order = orderMap.get(Number(orderId));
      if (order) {
        await Promise.all([
          deleteOrderById(Number(orderId)),
          deleteOrderOnStock(Number(orderId)),
          clientInstance.del("allOrders"),
          clientInstance.del("oneOrder"),
        ]);

        await findAndKeepOrders();
        return res
          .status(201)
          .json(`Order by id:${orderId} deleted successfully`);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ---------------- UPDATE ORDER ----------------
//

export const updateOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const {
    client,
    products,
  }: {
    client?: { id: number; nome?: string };
    products?: {
      id: number;
      name?: string;
      preco?: number;
      quantity: number;
    }[];
  } = req.body;
  const clientInstance = await redisClient;

  try {
    // Verify if there are enough products in stock
    const allStocks = await clientInstance.get("allStocks");
    if (allStocks) {
      const parseAllStocks: { id: number; quantidade: number; nome: string }[] =
        await JSON.parse(allStocks);
      const stockMap = new Map(
        parseAllStocks.map((stock) => [stock.id, stock])
      );
      if (products) {
        const verifyStocks = products.map((product) => {
          const stock = stockMap.get(product.id);
          if (stock) {
            if (stock.quantidade < product.quantity) {
              return false;
            }
            return true;
          }
        });

        if (verifyStocks.includes(false)) {
          return res.status(400).json("Quantidade de estoque insuficiente!");
        }
      }
    }

    const allOrders = await clientInstance.get("allOrders");
    if (allOrders) {
      const parseAllOrders: {
        id: number;
        client: { id: number; nome: string };
        products: {
          id: number;
          name: string;
          preco: number;
          quantity: number;
        }[];
      }[] = await JSON.parse(allOrders);
      const orderMap = new Map(
        parseAllOrders.map((order) => [order.id, order])
      );
      const order = orderMap.get(Number(orderId));
      if (order) {
        if (client) {
          await clientInstance.del(["allOrders", "oneOrder"]);
          await prisma.pedidos.update({
            where: {
              id: Number(orderId),
            },
            data: {
              cliente_id: client.id,
            },
          });
          await findAndKeepOrders();
          return res.status(201).json("Order updated successfully");
        }

        if (products) {
          const [estoqueId, quantity] = await Promise.all([
            products.map((product) => product.id),
            products.map((product) => product.quantity),
          ]);

          await clientInstance.del(["allOrders", "oneOrder"]);
          await prisma.pedidosOnEstoques.deleteMany({
            where: {
              pedido_id: Number(orderId),
            },
          });
          await prisma.pedidosOnEstoques.createMany({
            data: estoqueId.map((id, index) => ({
              pedido_id: Number(orderId),
              estoque_id: id,
              quantidade: quantity[index],
            })),
          });

          await findAndKeepOrders();
          return res.status(201).json("Order updated successfully");
        }
      }
    }

    res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(400).json(error);
  }
};
