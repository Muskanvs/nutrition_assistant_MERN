import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true, min: 0.1 },
    unit: { type: String, default: "serving" }
  },
  { _id: false }
);

const mealSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      default: "breakfast"
    },
    date: { type: Date, default: Date.now, index: true },
    items: [mealItemSchema],
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Meal", mealSchema);
