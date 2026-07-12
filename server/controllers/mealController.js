import Meal from "../models/Meal.js";
import NutritionFact from "../models/NutritionFact.js";
import { addTotals, emptyTotals, scaleNutrition } from "../utils/nutrition.js";

function startOfDay(dateValue) {
  const date = dateValue ? new Date(dateValue) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfDay(dateValue) {
  const date = startOfDay(dateValue);
  date.setHours(23, 59, 59, 999);
  return date;
}

export async function calculateMealTotals(meal) {
  const populated = await meal.populate("items.food");
  return populated.items.reduce((total, item) => addTotals(total, scaleNutrition(item.food, item.quantity)), emptyTotals());
}

export async function createMeal(req, res) {
  try {
    const meal = await Meal.create({ ...req.body, userId: req.user._id });
    const totals = await calculateMealTotals(meal);
    await NutritionFact.create({ userId: req.user._id, mealId: meal._id, ...totals, date: meal.date, source: "meal" });
    res.status(201).json({ meal: await meal.populate("items.food"), totals });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function listMeals(req, res) {
  const filter = { userId: req.user._id };
  if (req.query.date) filter.date = { $gte: startOfDay(req.query.date), $lte: endOfDay(req.query.date) };
  const meals = await Meal.find(filter).populate("items.food").sort({ date: -1, createdAt: -1 });
  const enriched = await Promise.all(meals.map(async (meal) => ({ ...meal.toObject(), totals: await calculateMealTotals(meal) })));
  res.json({ meals: enriched });
}

export async function updateMeal(req, res) {
  const meal = await Meal.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });
  if (!meal) return res.status(404).json({ message: "Meal not found" });
  const totals = await calculateMealTotals(meal);
  await NutritionFact.findOneAndUpdate(
    { mealId: meal._id },
    { userId: req.user._id, mealId: meal._id, ...totals, date: meal.date, source: "meal" },
    { upsert: true, new: true }
  );
  res.json({ meal: await meal.populate("items.food"), totals });
}

export async function deleteMeal(req, res) {
  const meal = await Meal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!meal) return res.status(404).json({ message: "Meal not found" });
  await NutritionFact.deleteMany({ mealId: meal._id });
  res.json({ message: "Meal deleted" });
}
