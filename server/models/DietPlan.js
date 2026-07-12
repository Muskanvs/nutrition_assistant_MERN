import mongoose from "mongoose";

const planDaySchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    breakfast: { type: String, default: "" },
    lunch: { type: String, default: "" },
    dinner: { type: String, default: "" },
    snack: { type: String, default: "" }
  },
  { _id: false }
);

const dietPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    goal: {
      type: String,
      enum: ["weight-loss", "maintenance", "muscle-gain", "balanced"],
      default: "balanced"
    },
    preferences: [{ type: String }],
    restrictions: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    targetCalories: { type: Number, min: 800 },
    targetProtein: { type: Number, min: 0 },
    targetCarbs: { type: Number, min: 0 },
    targetFats: { type: Number, min: 0 },
    days: [planDaySchema],
    adherence: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ["draft", "active", "completed"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.model("DietPlan", dietPlanSchema);
