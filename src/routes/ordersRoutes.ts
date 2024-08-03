import { Router } from "express";
import {
  getAllOrders,
  getOneOrder,
  postOrder,
} from "../controllers/ordersControllers";

const router = Router();

router.post("/", postOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOneOrder);

export default router;
