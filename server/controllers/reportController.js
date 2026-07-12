import Meal from "../models/Meal.js";
import DietPlan from "../models/DietPlan.js";
import { calculateMealTotals } from "./mealController.js";
import { addTotals, calculateTargets, emptyTotals } from "../utils/nutrition.js";

export async function getDashboard(req, res) {
  const date = req.query.date ? new Date(req.query.date) : new Date();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const meals = await Meal.find({ userId: req.user._id, date: { $gte: start, $lte: end } }).populate("items.food");
  const totals = (await Promise.all(meals.map(calculateMealTotals))).reduce((sum, item) => addTotals(sum, item), emptyTotals());
  const targets = calculateTargets(req.user);
  const activePlan = await DietPlan.findOne({ userId: req.user._id, status: "active" }).sort({ createdAt: -1 });

  res.json({
    totals,
    targets,
    progress: {
      calories: Math.min(100, Math.round((totals.calories / targets.calories) * 100)),
      proteins: Math.min(100, Math.round((totals.proteins / targets.proteins) * 100)),
      carbohydrates: Math.min(100, Math.round((totals.carbohydrates / targets.carbohydrates) * 100)),
      fats: Math.min(100, Math.round((totals.fats / targets.fats) * 100))
    },
    activePlan,
    mealsCount: meals.length
  });
}

export async function getReport(req, res) {
  const days = Number(req.query.days || 7);
  const start = new Date();
  start.setDate(start.getDate() - days + 1);
  start.setHours(0, 0, 0, 0);
  const meals = await Meal.find({ userId: req.user._id, date: { $gte: start } }).populate("items.food").sort({ date: 1 });

  const byDay = {};
  for (const meal of meals) {
    const key = meal.date.toISOString().slice(0, 10);
    byDay[key] ||= emptyTotals();
    byDay[key] = addTotals(byDay[key], await calculateMealTotals(meal));
  }

  res.json({
    days,
    targets: calculateTargets(req.user),
    series: Object.entries(byDay).map(([date, totals]) => ({ date, ...totals })),
    totalMeals: meals.length
  });
}
