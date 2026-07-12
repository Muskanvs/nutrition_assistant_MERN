import express from "express";
import { createFood, deleteFood, listFoods, updateFood } from "../controllers/foodController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listFoods);
router.post("/", protect, createFood);
router.put("/:id", protect, updateFood);
router.delete("/:id", protect, deleteFood);

export default router;
