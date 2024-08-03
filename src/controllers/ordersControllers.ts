import { Request, Response } from "express";
import {
  createOrder,
  findAllOrdersOnStocks,
  findAllProducts,
  findManyOrders,
  findManyOrdersOnStocks,
  findManyProducts,
  findOrderById,
  getClientByNameOrId,
  getClients,
} from "../utils";

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

  try {
    const order = await findOrderById(Number(orderId));
    if (order) {
      const [client, orderOnStock] = await Promise.all([
        getClientByNameOrId(order.cliente_id.toString()),
        findManyOrdersOnStocks([order]),
      ]);
      if (client && orderOnStock) {
        const productsId = orderOnStock
          .flat()
          .map((item) => ({ id: item.estoque_id }));
        const products = await findManyProducts(productsId);

        const productMap = new Map(
          products.map((product) => [product.id, product])
        );
        const productWithQuantity = orderOnStock
          .flat()
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

        const orderResult = {
          id: order.id,
          client: client[0],
          products: productWithQuantity,
        };

        return res.status(200).json(orderResult);
      }
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
