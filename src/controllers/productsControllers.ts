import { Request, Response } from "express";

export const createProduct = (req: Request, res: Response) => {
  res.status(201).json("createProdutos");
};
