import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function FoodLog({ setToast }) {
  const [foods, setFoods] = useState([]);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "My meal", mealType: "breakfast", food: "", quantity: 1 });

  async function load() {
    const [foodData, mealData] = await Promise.all([api(`/foods?search=${encodeURIComponent(search)}`), api("/meals")]);
    setFoods(foodData.foods);
    setMeals(mealData.meals);
    if (!form.food && foodData.foods[0]) setForm((current) => ({ ...current, food: foodData.foods[0]._id }));
  }

  useEffect(() => {
    load().catch(console.error);
  }, [search]);

  async function submit(event) {
    event.preventDefault();
    await api("/meals", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        mealType: form.mealType,
        items: [{ food: form.food, quantity: Number(form.quantity), unit: "serving" }]
      })
    });
    setToast("Meal logged");
    await load();
  }

  return (
    <section className="split">
      <div className="panel">
        <h3>Food Consumption Tracking</h3>
        <input className="search-input" placeholder="Search food database" value={search} onChange={(e) => setSearch(e.target.value)} />
        <form className="stack-form" onSubmit={submit}>
          <label>Meal name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Meal type<select value={form.mealType} onChange={(e) => setForm({ ...form, mealType: e.target.value })}><option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option><option value="snack">Snack</option></select></label>
          <label>Food<select value={form.food} onChange={(e) => setForm({ ...form, food: e.target.value })}>{foods.map((food) => <option key={food._id} value={food._id}>{food.name} · {food.calories} kcal</option>)}</select></label>
          <label>Quantity<input type="number" min="0.1" step="0.1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></label>
          <button>Save to Daily Log</button>
        </form>
      </div>
      <div className="panel">
        <h3>Recent Meals</h3>
        <div className="list">
          {meals.map((meal) => (
            <article key={meal._id} className="list-item">
              <strong>{meal.name}</strong>
              <span>{meal.mealType} · {new Date(meal.date).toLocaleDateString()}</span>
              <small>{meal.totals?.calories || 0} kcal · P {meal.totals?.proteins || 0}g · C {meal.totals?.carbohydrates || 0}g · F {meal.totals?.fats || 0}g</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
