import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { redisClient } from "../redisConfig";
import { findAndKeepSelling } from "../utils";

const prisma = new PrismaClient();
findAndKeepSelling();

//
// ------------------ Create Selling ------------------
//

export const createSelling = async (req: Request, res: Response) => {
  const { pedidoId } = req.body;

  try {
    const clientInstance = await redisClient;
    const allOrders = await clientInstance.get("allOrders");
    if (allOrders) {
      const parseAllOrders: {
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
      }[] = JSON.parse(allOrders);
      const orderMap = new Map(
        parseAllOrders.map((order) => [order.id, order])
      );
      const order = orderMap.get(pedidoId);

      if (order) {
        const totalValueTheEachProduct = order.products.map((product) => {
          let priceTimesQuantity = product.preco * product.quantity;
          return priceTimesQuantity;
        });
        const totalValueOfOrder = totalValueTheEachProduct.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue;
          },
          0
        );

        const allStocks = await clientInstance.get("allStocks");
        if (allStocks) {
          const parseAllStocks: {
            id: number;
            quantidade: number;
            nome: string;
          }[] = JSON.parse(allStocks);
          const stockMap = new Map(
            parseAllStocks.map((stock) => [stock.id, stock])
          );
          const updateStocks = order.products.map((product) => {
            const stock = stockMap.get(product.id);
            if (stock) {
              stock.quantidade -= product.quantity;
              return stock;
            }
          });

          if (updateStocks) {
            await updateStocks.map(async (stock) => {
              await prisma.estoques.update({
                where: {
                  id: stock?.id,
                },
                data: {
                  quantidade: stock?.quantidade,
                },
              });
            });

            await clientInstance.set("allStocks", JSON.stringify(updateStocks));
            await prisma.vendas.create({
              data: {
                pedido_id: pedidoId,
                valor_total: totalValueOfOrder,
                data: new Date(),
              },
            });

            return res
              .status(201)
              .json({ message: "Venda criada com sucesso!" });
          }
        }
      }
    }

    res.status(400).json({ message: "Venda não encontrada" });
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ------------------ Get All Selling ------------------
//

export const getAllSelling = async (req: Request, res: Response) => {
  try {
    const clientInstance = await redisClient;
    const verifySelling = await clientInstance.get("allSelling");
    if (verifySelling) {
      return res.status(200).json(JSON.parse(verifySelling));
    }

    const selling = await prisma.vendas.findMany();
    res.status(200).json(selling);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ------------------ Delete Selling ------------------
//

export const deleteSelling = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clientInstance = await redisClient;

  try {
    const allSelling = await clientInstance.get("allSelling");
    if (allSelling) {
      const parseAllSelling: {
        id: number;
        pedido_id: number;
        valor_total: number;
        data: Date;
      }[] = JSON.parse(allSelling);

      const sellingMap = new Map(
        parseAllSelling.map((selling) => [selling.id, selling])
      );

      const selling = sellingMap.get(Number(id));
      if (selling) {
        await prisma.vendas.delete({
          where: {
            id: Number(id),
          },
        });

        await clientInstance.del("allSelling");
        await findAndKeepSelling();
        return res.status(200).json({ message: "Venda deletada com sucesso!" });
      }
    }

    res.status(400).json({ message: "Venda não encontrada" });
  } catch (error) {
    res.status(400).json(error);
  }
};
