import { Request, Response } from "express";
import {
  createOrder,
  findManyOrders,
  findManyOrdersOnStocks,
  findManyProducts,
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
    class Order {
      id: number;
      client: { id: number; nome: string };
      products: Array<{
        id: number;
        name: string;
        preco: number;
        quantity: number;
      }>;

      constructor(
        id: number,
        client: { id: number; nome: string },
        products: Array<{
          id: number;
          name: string;
          preco: number;
          quantity: number;
        }>
      ) {
        this.id = id;
        this.client = client;
        this.products = products;
      }
    }

    const orders: Array<{ id: number; cliente_id: number }> =
      await findManyOrders();

    const getItensOfOrders: Array<
      Array<{
        estoque_id: number;
        pedido_id: number;
        quantidade: number;
      }>
    > = await findManyOrdersOnStocks(orders);

    const clients = await getClients();

    const allOrders = [];

    for (let i = 0; i < getItensOfOrders.length; i++) {
      let allItensOrders = getItensOfOrders[i];
      let id = allItensOrders[0].pedido_id;
      let client = clients.find((client) => client.id === id);
      let productsId = allItensOrders.map((product) => ({
        id: product.estoque_id,
      }));
      let products = await findManyProducts(productsId);
      let quantity = allItensOrders.map((product) => ({
        quantity: product.quantidade,
      }));

      let productsWithQuantity: {
        id: number;
        name: string;
        preco: number;
        quantity: number;
      }[] = [];

      for (let j = 0; j < products.length; j++) {
        productsWithQuantity.push({
          id: products[j].id,
          name: products[j].nome,
          preco: products[j].preco,
          quantity: quantity[j].quantity,
        });
      }

      if (client) {
        let order = new Order(id, client, productsWithQuantity);
        allOrders.push(order);
      }
    }

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json(error);
  }
};
