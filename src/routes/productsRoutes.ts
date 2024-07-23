import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "../controllers/productsControllers";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getOneProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
