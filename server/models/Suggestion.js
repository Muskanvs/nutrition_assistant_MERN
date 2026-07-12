import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category: {
      type: String,
      enum: ["food", "meal", "diet-plan", "guidance"],
      default: "guidance"
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    metrics: {
      calories: Number,
      carbohydrates: Number,
      proteins: Number,
      fats: Number
    },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Suggestion", suggestionSchema);
