import { Router } from "express";
import { getOneStock, updateStock } from "../controllers/stocksControllers";

const router = Router();

router.get("/:stockId", getOneStock);
router.put("/:stockId", updateStock);

export default router;
