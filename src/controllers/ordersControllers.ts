import { Request, Response } from "express";
import { createClient } from "redis";
import {
  createOrder,
  findAllOrdersOnStocks,
  findAllProducts,
  findManyOrders,
  findManyProducts,
  getClientByNameOrId,
  getClients,
} from "../utils";

const client = createClient({
  password: "wyCfJNs2GVmPqkjox3qz8bffj2vZZnzE",
  socket: {
    host: "redis-15074.c98.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 15074,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

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
    const clientInstance = await client;
    const verifyOrders = await clientInstance.get("allOrders");
    if (verifyOrders) {
      return res.status(200).json(JSON.parse(verifyOrders));
    }

    const [orders, ordersOnStocks, clients, products] = await Promise.all([
      findManyOrders(),
      findAllOrdersOnStocks(),
      getClients(),
      findAllProducts(),
    ]);

    const clientMap = new Map(clients.map((client) => [client.id, client]));
    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    const allOrders = orders
      .map((order) => {
        const itemOfOrder = ordersOnStocks.filter(
          (item) => item.pedido_id === order.id
        );
        const client = clientMap.get(order.cliente_id);

        if (client) {
          const productWithQuantity = itemOfOrder
            .map((item) => {
              const product = productMap.get(item.estoque_id);
              if (product) {
                return {
                  id: product.id,
                  name: product.nome,
                  preco: product.preco,
                  quantity: item.quantidade,
                };
              }
              return null;
            })
            .filter((product) => product !== null);

          return {
            id: order.id,
            client: client,
            products: productWithQuantity,
          };
        }
        return null;
      })
      .filter((product) => product !== null);

    clientInstance.set("allOrders", JSON.stringify(allOrders));
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ---------------- GET ONE ORDER ----------------
//

export const getOneOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const clientInstance = await client;

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
  } catch (error) {
    res.status(400).json(error);
  }
};
