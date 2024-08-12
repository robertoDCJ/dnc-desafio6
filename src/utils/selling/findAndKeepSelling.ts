import { PrismaClient } from "@prisma/client";
import { redisClient } from "../../redisConfig";

const prisma = new PrismaClient();

export const findAndKeepSelling = async () => {
  const clientInstance = await redisClient;

  const verifyRedis = await clientInstance.get("allSelling");

  if (verifyRedis) {
    return JSON.parse(verifyRedis);
  }

  const allSelling = await prisma.vendas.findMany();

  await clientInstance.set("allSelling", JSON.stringify(allSelling));
};
