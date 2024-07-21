import { Router } from "express";
import { createProduct } from "../controllers/produtosControllers";

const router = Router();

router.post("/", createProduct);

export default router;
