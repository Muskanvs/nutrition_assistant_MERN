import Suggestion from "../models/Suggestion.js";
import NutritionFact from "../models/NutritionFact.js";
import { emptyTotals, addTotals } from "../utils/nutrition.js";
import { suggestNutrition } from "../utils/suggestNutrition.js";

export async function createSuggestions(req, res) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const facts = await NutritionFact.find({ userId: req.user._id, source: "meal", date: { $gte: start } });
  const totals = facts.reduce((sum, fact) => addTotals(sum, fact), emptyTotals());
  const docs = suggestNutrition(req.user, totals).map((item) => ({ ...item, userId: req.user._id }));
  const suggestions = await Suggestion.insertMany(docs);
  res.status(201).json({ suggestions, totals });
}

export async function listSuggestions(req, res) {
  const suggestions = await Suggestion.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(30);
  res.json({ suggestions });
}

export async function updateSuggestion(req, res) {
  const suggestion = await Suggestion.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true
  });
  if (!suggestion) return res.status(404).json({ message: "Suggestion not found" });
  res.json({ suggestion });
}
