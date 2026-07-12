import DietPlan from "../models/DietPlan.js";
import NutritionFact from "../models/NutritionFact.js";
import { calculateTargets } from "../utils/nutrition.js";

function buildDefaultDays(goal, preference) {
  const protein = preference === "vegetarian" || preference === "vegan" ? "lentils, tofu, beans, or Greek yogurt" : "eggs, fish, chicken, paneer, or lentils";
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => ({
    day,
    breakfast: "Oats with fruit and seeds",
    lunch: `Balanced bowl with ${protein}, vegetables, and whole grains`,
    dinner: goal === "weight-loss" ? "Light protein plate with salad and soup" : "Protein-focused meal with complex carbohydrates",
    snack: "Fruit, yogurt, nuts, or roasted chickpeas"
  }));
}

export async function createDietPlan(req, res) {
  try {
    const targets = calculateTargets(req.user);
    const plan = await DietPlan.create({
      userId: req.user._id,
      title: req.body.title || `${req.user.goal.replace("-", " ")} plan`,
      goal: req.body.goal || req.user.goal,
      preferences: req.body.preferences || [req.user.dietaryPreference],
      restrictions: req.body.restrictions || [],
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      targetCalories: req.body.targetCalories || targets.calories,
      targetProtein: req.body.targetProtein || targets.proteins,
      targetCarbs: req.body.targetCarbs || targets.carbohydrates,
      targetFats: req.body.targetFats || targets.fats,
      days: req.body.days?.length ? req.body.days : buildDefaultDays(req.body.goal || req.user.goal, req.user.dietaryPreference)
    });
    await NutritionFact.create({
      userId: req.user._id,
      dietPlanId: plan._id,
      calories: plan.targetCalories,
      proteins: plan.targetProtein,
      carbohydrates: plan.targetCarbs,
      fats: plan.targetFats,
      source: "diet-plan"
    });
    res.status(201).json({ plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function listDietPlans(req, res) {
  const plans = await DietPlan.find({ userId: req.user._id }).sort({ startDate: -1 });
  res.json({ plans });
}

export async function updateDietPlan(req, res) {
  const plan = await DietPlan.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });
  if (!plan) return res.status(404).json({ message: "Diet plan not found" });
  res.json({ plan });
}

export async function deleteDietPlan(req, res) {
  const plan = await DietPlan.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!plan) return res.status(404).json({ message: "Diet plan not found" });
  await NutritionFact.deleteMany({ dietPlanId: plan._id });
  res.json({ message: "Diet plan deleted" });
}
