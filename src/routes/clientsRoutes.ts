import { Router } from "express";
import { createClient, getAllClients } from "../controllers/clientsControllers";

const router = Router();

router.post("/", createClient);
router.get("/", getAllClients);

export default router;
