import { Router } from "express";
import {
  createClient,
  filterClient,
  getAllClients,
  updateClient,
} from "../controllers/clientsControllers";

const router = Router();

router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:name", filterClient);
router.put("/:id", updateClient);

export default router;
