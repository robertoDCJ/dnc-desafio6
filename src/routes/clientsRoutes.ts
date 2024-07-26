import { Router } from "express";
import {
  createClient,
  deleteClient,
  getAllClients,
  getOneClient,
  updateClient,
} from "../controllers/clientsControllers";

const router = Router();

router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:idOrName", getOneClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
