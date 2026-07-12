import express from "express";
import { createMeal, deleteMeal, listMeals, updateMeal } from "../controllers/mealController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listMeals);
router.post("/", protect, createMeal);
router.put("/:id", protect, updateMeal);
router.delete("/:id", protect, deleteMeal);

export default router;
