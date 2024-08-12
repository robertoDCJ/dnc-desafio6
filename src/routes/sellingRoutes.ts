import { Router } from "express";
import {
  createSelling,
  deleteSelling,
  getAllSelling,
} from "../controllers/sellingContollers";

const router = Router();

router.get("/", getAllSelling);
router.post("/", createSelling);
router.get("/:id");
router.delete("/:id", deleteSelling);
router.put("/:id");

export default router;
