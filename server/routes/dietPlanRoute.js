import express from "express";
import { createDietPlan, deleteDietPlan, listDietPlans, updateDietPlan } from "../controllers/dietPlanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listDietPlans);
router.post("/", protect, createDietPlan);
router.put("/:id", protect, updateDietPlan);
router.delete("/:id", protect, deleteDietPlan);

export default router;
