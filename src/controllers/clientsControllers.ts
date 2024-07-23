import { Request, Response } from "express";
import { postClient } from "../utils";
import { getClients } from "../utils/clients/getClients";

//
// ----------------------------- CREATE CLIENT -------------------------------
//

export const createClient = async (req: Request, res: Response) => {
  const { nome } = req.body;
  try {
    await postClient(nome);

    res.status(201).json(`Cliente ${nome} criado com sucesso!`);
  } catch (error) {
    res.status(500).json(error);
  }
};

//
// ----------------------------- GET ALL CLIENTS -------------------------------
//

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await getClients();

    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ----------------------------- GET ONE CLIENT -------------------------------
//
