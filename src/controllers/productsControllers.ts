import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//
// ----------------------------- CREATE PRODUCTS -------------------------------
//

async function postProduct(nome: string, preco: number) {
  await prisma.produtos.create({ data: { nome, preco } });
  await prisma.estoques.create({ data: {} });
}

export const createProduct = async (req: Request, res: Response) => {
  const { nome, preco } = req.body;

  await postProduct(nome, preco)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  res.status(201).json(`Produto ${nome} criado com sucesso!`);
};

//
// ----------------------------- GET PRODUCTS -------------------------------
//

async function showProducts() {
  const products = await prisma.produtos.findMany();
  const stocks = await prisma.estoques.findMany();

  const productsWithStock = products.map((product, index) => ({
    ...product,
    stock: stocks[index].quantidade,
  }));

  return productsWithStock;
}

export const getProducts = async (req: Request, res: Response) => {
  const products = await showProducts();

  res.status(200).json(products);
};
