import mongoose from "mongoose";

const nutritionFactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
    dietPlanId: { type: mongoose.Schema.Types.ObjectId, ref: "DietPlan" },
    calories: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    date: { type: Date, default: Date.now, index: true },
    source: { type: String, enum: ["meal", "diet-plan", "manual"], default: "meal" }
  },
  { timestamps: true }
);

export default mongoose.model("NutritionFact", nutritionFactSchema);
