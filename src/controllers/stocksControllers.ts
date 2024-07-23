import { Request, Response } from "express";
import { findUniqueStock, showStocks, updateStockById } from "../utils";

//
// ----------------------------- GET ALL STOCK -------------------------------
//

export const getAllStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await showStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
};

//
// ----------------------------- GET ONE STOCK -------------------------------
//

export const getOneStock = async (req: Request, res: Response) => {
  const { stockId } = req.params;

  try {
    const stock = await findUniqueStock(Number(stockId));

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).send(error);
  }
};

//
// ----------------------------- UPDATE ONE STOCK -------------------------------
//

export const updateStock = async (req: Request, res: Response) => {
  const { stockId } = req.params;
  const { quantidade } = req.body;

  try {
    await updateStockById(Number(stockId), Number(quantidade));

    res.status(200).json(`Estoque com id:${stockId} atualizado com sucesso!`);
  } catch (error) {
    res.status(500).send(error);
  }
};
