import { Router } from "express";
import {
  deleteOrder,
  getAllOrders,
  getOneOrder,
  postOrder,
} from "../controllers/ordersControllers";

const router = Router();

router.post("/", postOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOneOrder);
router.delete("/:orderId", deleteOrder);

export default router;
