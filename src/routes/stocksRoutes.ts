import { Router } from "express";
import {
  getAllStocks,
  getOneStock,
  updateStock,
} from "../controllers/stocksControllers";

const router = Router();

router.get("/", getAllStocks);
router.get("/:stockId", getOneStock);
router.put("/:stockId", updateStock);

export default router;
