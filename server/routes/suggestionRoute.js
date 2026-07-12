import express from "express";
import { createSuggestions, listSuggestions, updateSuggestion } from "../controllers/suggestionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listSuggestions);
router.post("/generate", protect, createSuggestions);
router.put("/:id", protect, updateSuggestion);

export default router;
