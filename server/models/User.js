import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    age: { type: Number, min: 10, max: 120 },
    weight: { type: Number, min: 20 },
    height: { type: Number, min: 80 },
    gender: { type: String, enum: ["female", "male", "other"], default: "other" },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very-active"],
      default: "moderate"
    },
    goal: {
      type: String,
      enum: ["weight-loss", "maintenance", "muscle-gain", "balanced"],
      default: "balanced"
    },
    dietaryPreference: {
      type: String,
      enum: ["none", "vegetarian", "vegan", "high-protein", "low-carb"],
      default: "none"
    },
    role: { type: String, enum: ["customer", "admin"], default: "customer" }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);
