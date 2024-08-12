import { Router } from "express";
import {
  createSelling,
  deleteSelling,
  getAllSelling,
} from "../controllers/sellingContollers";

const router = Router();

router.get("/", getAllSelling);
router.post("/", createSelling);
router.delete("/:id", deleteSelling);

export default router;
