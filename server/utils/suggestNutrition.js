import { calculateTargets } from "./nutrition.js";

export function suggestNutrition(user, totals = {}) {
  const targets = calculateTargets(user);
  const suggestions = [];
  const proteinGap = targets.proteins - (totals.proteins || 0);
  const calorieGap = targets.calories - (totals.calories || 0);

  if (proteinGap > 20) {
    suggestions.push({
      category: "food",
      title: "Increase lean protein",
      message: `Add a protein-rich option today. You are about ${Math.round(proteinGap)}g below your target.`,
      priority: "high"
    });
  }

  if (calorieGap > 500) {
    suggestions.push({
      category: "meal",
      title: "Plan a balanced meal",
      message: "Your calorie intake is low for your current target. Add a complete meal with protein, fiber-rich carbs, and healthy fats.",
      priority: "medium"
    });
  }

  if ((totals.fats || 0) > targets.fats * 1.15) {
    suggestions.push({
      category: "guidance",
      title: "Watch fat balance",
      message: "Fat intake is trending above target. Choose grilled or steamed options for the next meal.",
      priority: "medium"
    });
  }

  if (user.goal === "weight-loss") {
    suggestions.push({
      category: "guidance",
      title: "Portion checkpoint",
      message: "Use smaller plates, drink water before meals, and prioritize vegetables to stay full within your target.",
      priority: "low"
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      category: "guidance",
      title: "Nice nutritional balance",
      message: "Your intake is close to target. Keep meals colorful and consistent.",
      priority: "low"
    });
  }

  return suggestions.map((suggestion) => ({ ...suggestion, metrics: targets }));
}
