import { PrismaClient } from "@prisma/client";
import { redisClient } from "../../redisConfig";

const prisma = new PrismaClient();

export const findAndKeepStocks = async () => {
  const clientInstance = await redisClient;
  const stocks = await prisma.estoques.findMany();

  await clientInstance.set("allStocks", JSON.stringify(stocks));

  return stocks;
};
