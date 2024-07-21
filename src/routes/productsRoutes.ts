import { Router } from "express";
import { createProduct } from "../controllers/productsControllers";

const router = Router();

router.post("/", createProduct);

export default router;
