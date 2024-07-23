import { Request, Response } from "express";
import {
  deleteOneProduct,
  findUniqueProduct,
  postProduct,
  showProducts,
  updateOneProduct,
} from "../utils";

//
// ----------------------------- CREATE PRODUCTS -------------------------------
//

export const createProduct = async (req: Request, res: Response) => {
  const { nome, preco } = req.body;

  try {
    await postProduct(nome, preco);

    res.status(201).json(`Produto ${nome} criado com sucesso!`);
  } catch (error) {
    res.status(500).json(error);
  }
};

//
// ----------------------------- GET ALL PRODUCTS -------------------------------
//

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productsList = await showProducts();
    res.status(200).json(productsList);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ----------------------------- GET ONE PRODUCT -------------------------------
//

export const getOneProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await findUniqueProduct(Number(productId));

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

//
// ----------------------------- UPDATE PRODUCT -------------------------------
//

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    await updateOneProduct(Number(id), nome, preco);

    res.status(200).json(`Produto com id:${id} atualizado com sucesso!`);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ----------------------------- DELETE PRODUCT -------------------------------
//

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteOneProduct(Number(id));

    res.status(200).json(`Produto com id:${id} deletado com sucesso!`);
  } catch (error) {
    res.status(400).json(error);
  }
};
