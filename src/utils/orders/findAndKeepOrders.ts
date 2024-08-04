import { redisClient } from "../../redisConfig";
import { getClients } from "../clients/getClients";
import { findAllOrdersOnStocks } from "../ordersOnStoks/findAllOrdersOnStocks";
import { findAllProducts } from "../product/findAllProducts";
import { findManyOrders } from "./findManyOrders";

export const findAndKeepOrders = async () => {
  const clientInstance = await redisClient;

  const [orders, ordersOnStocks, clients, products] = await Promise.all([
    findManyOrders(),
    findAllOrdersOnStocks(),
    getClients(),
    findAllProducts(),
  ]);

  const clientMap = new Map(clients.map((client) => [client.id, client]));
  const productMap = new Map(products.map((product) => [product.id, product]));

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
  return allOrders;
};
