import { Router } from "express";
import { postOrder } from "../controllers/ordersControllers";

const router = Router();

router.post("/", postOrder);

export default router;
