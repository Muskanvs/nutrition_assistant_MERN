import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    category: { type: String, default: "General", trim: true },
    servingSize: { type: Number, default: 100, min: 1 },
    servingUnit: { type: String, default: "g", trim: true },
    calories: { type: Number, required: true, min: 0 },
    carbohydrates: { type: Number, required: true, min: 0 },
    proteins: { type: Number, required: true, min: 0 },
    fats: { type: Number, required: true, min: 0 },
    fiber: { type: Number, default: 0, min: 0 },
    sugar: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
