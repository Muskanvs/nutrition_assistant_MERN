import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { seedFoodsIfEmpty } from "./controllers/foodController.js";
import dietPlanRoutes from "./routes/dietPlanRoute.js";
import foodRoutes from "./routes/foodRoute.js";
import mealRoutes from "./routes/mealRoute.js";
import reportRoutes from "./routes/reportRoute.js";
import suggestionRoutes from "./routes/suggestionRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "Nutrition Assistant API", status: "healthy" });
});

app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/plans", dietPlanRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reports", reportRoutes);

app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Server error" });
});

connectDB().then(async () => {
  await seedFoodsIfEmpty();
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
});
