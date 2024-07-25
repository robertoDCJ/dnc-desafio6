import { Router } from "express";
import {
  createClient,
  getAllClients,
  getOneClient,
  updateClient,
} from "../controllers/clientsControllers";

const router = Router();

router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:idOrName", getOneClient);
router.put("/:id", updateClient);

export default router;
