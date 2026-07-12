import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { calculateTargets } from "../utils/nutrition.js";

function createToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || "local-nutrition-assistant-secret", {
    expiresIn: "7d"
  });
}

function publicUser(user) {
  const data = user.toObject();
  delete data.password;
  return { ...data, targets: calculateTargets(user) };
}

export async function register(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create(req.body);
    res.status(201).json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function updateProfile(req, res) {
  const allowed = ["username", "age", "weight", "height", "gender", "activityLevel", "goal", "dietaryPreference"];
  for (const key of allowed) {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  }
  await req.user.save();
  res.json({ user: publicUser(req.user) });
}
