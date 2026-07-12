import express from "express";
import { getDashboard, getReport } from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboard);
router.get("/progress", protect, getReport);

export default router;
