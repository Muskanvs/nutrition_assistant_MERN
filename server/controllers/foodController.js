import Food from "../models/Food.js";

const starterFoods = [
  { name: "Oats", category: "Grains", servingSize: 100, servingUnit: "g", calories: 389, carbohydrates: 66.3, proteins: 16.9, fats: 6.9, fiber: 10.6 },
  { name: "Brown Rice", category: "Grains", servingSize: 100, servingUnit: "g", calories: 123, carbohydrates: 25.6, proteins: 2.7, fats: 1, fiber: 1.8 },
  { name: "Chicken Breast", category: "Protein", servingSize: 100, servingUnit: "g", calories: 165, carbohydrates: 0, proteins: 31, fats: 3.6 },
  { name: "Paneer", category: "Protein", servingSize: 100, servingUnit: "g", calories: 265, carbohydrates: 3.6, proteins: 18.3, fats: 20.8 },
  { name: "Lentils", category: "Protein", servingSize: 100, servingUnit: "g", calories: 116, carbohydrates: 20.1, proteins: 9, fats: 0.4, fiber: 7.9 },
  { name: "Banana", category: "Fruit", servingSize: 1, servingUnit: "medium", calories: 105, carbohydrates: 27, proteins: 1.3, fats: 0.4, fiber: 3.1 },
  { name: "Greek Yogurt", category: "Dairy", servingSize: 100, servingUnit: "g", calories: 59, carbohydrates: 3.6, proteins: 10, fats: 0.4 },
  { name: "Avocado", category: "Fats", servingSize: 100, servingUnit: "g", calories: 160, carbohydrates: 8.5, proteins: 2, fats: 14.7, fiber: 6.7 }
];

export async function seedFoodsIfEmpty() {
  const count = await Food.countDocuments();
  if (!count) await Food.insertMany(starterFoods);
}

export async function listFoods(req, res) {
  const { search = "", category = "" } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = category;
  const foods = await Food.find(filter).sort({ name: 1 }).limit(100);
  res.json({ foods });
}

export async function createFood(req, res) {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({ food });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateFood(req, res) {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!food) return res.status(404).json({ message: "Food not found" });
  res.json({ food });
}

export async function deleteFood(req, res) {
  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) return res.status(404).json({ message: "Food not found" });
  res.json({ message: "Food deleted" });
}
