import { Router } from "express";
import { getAllOrders, postOrder } from "../controllers/ordersControllers";

const router = Router();

router.post("/", postOrder);
router.get("/", getAllOrders);

export default router;
