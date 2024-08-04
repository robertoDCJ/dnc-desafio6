import { Router } from "express";
import {
  deleteOrder,
  getAllOrders,
  getOneOrder,
  postOrder,
  updateOrder,
} from "../controllers/ordersControllers";

const router = Router();

router.post("/", postOrder);
router.get("/", getAllOrders);
router.get("/:orderId", getOneOrder);
router.delete("/:orderId", deleteOrder);
router.put("/:orderId", updateOrder);

export default router;
