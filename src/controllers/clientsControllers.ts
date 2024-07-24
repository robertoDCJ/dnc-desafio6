import { Request, Response } from "express";
import {
  filterClientByName,
  getClients,
  postClient,
  updateClientById,
} from "../utils";

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
// -------------------------- FILTER CLIENT BY NAME ----------------------------
//

export const filterClient = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const client = await filterClientByName(name);

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error);
  }
};

//
// ----------------------------- UPDATE CLIENT -------------------------------
//

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    await updateClientById(Number(id), nome);
    res.status(200).json(`Cliente com id:${id} atualizado com sucesso!`);
  } catch (error) {
    res.status(400).json(error);
  }
};
