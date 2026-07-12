const activityFactor = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9
};

export function calculateBmr(user) {
  const weight = Number(user.weight || 70);
  const height = Number(user.height || 170);
  const age = Number(user.age || 30);
  const base = 10 * weight + 6.25 * height - 5 * age;
  if (user.gender === "female") return Math.round(base - 161);
  if (user.gender === "male") return Math.round(base + 5);
  return Math.round(base - 78);
}

export function calculateTargets(user) {
  const maintenance = calculateBmr(user) * (activityFactor[user.activityLevel] || 1.55);
  const goalOffset = {
    "weight-loss": -400,
    maintenance: 0,
    "muscle-gain": 300,
    balanced: 0
  };
  const calories = Math.max(1200, Math.round(maintenance + (goalOffset[user.goal] || 0)));
  const protein = Math.round((calories * 0.25) / 4);
  const carbs = Math.round((calories * 0.45) / 4);
  const fats = Math.round((calories * 0.3) / 9);
  return { calories, proteins: protein, carbohydrates: carbs, fats };
}

export function scaleNutrition(food, quantity = 1) {
  const factor = Number(quantity || 1);
  return {
    calories: Math.round(food.calories * factor),
    carbohydrates: Number((food.carbohydrates * factor).toFixed(1)),
    proteins: Number((food.proteins * factor).toFixed(1)),
    fats: Number((food.fats * factor).toFixed(1))
  };
}

export function emptyTotals() {
  return { calories: 0, carbohydrates: 0, proteins: 0, fats: 0 };
}

export function addTotals(total, next) {
  return {
    calories: total.calories + (next.calories || 0),
    carbohydrates: Number((total.carbohydrates + (next.carbohydrates || 0)).toFixed(1)),
    proteins: Number((total.proteins + (next.proteins || 0)).toFixed(1)),
    fats: Number((total.fats + (next.fats || 0)).toFixed(1))
  };
}
