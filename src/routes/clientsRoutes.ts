import { Router } from "express";
import {
  createClient,
  filterClient,
  getAllClients,
} from "../controllers/clientsControllers";

const router = Router();

router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:name", filterClient);

export default router;
