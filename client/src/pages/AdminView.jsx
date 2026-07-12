import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";

const blank = { name: "", category: "General", servingSize: 100, servingUnit: "g", calories: 0, carbohydrates: 0, proteins: 0, fats: 0 };

export default function AdminView({ setToast }) {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState(blank);

  async function load() {
    const data = await api("/foods");
    setFoods(data.foods);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function submit(event) {
    event.preventDefault();
    await api("/foods", { method: "POST", body: JSON.stringify(form) });
    setForm(blank);
    setToast("Food item added");
    await load();
  }

  return (
    <section className="split">
      <div className="panel">
        <h3>Food Database</h3>
        <form className="stack-form" onSubmit={submit}>
          {["name", "category", "servingUnit"].map((key) => <label key={key}>{key}<input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}
          {["servingSize", "calories", "carbohydrates", "proteins", "fats"].map((key) => <label key={key}>{key}<input type="number" value={form[key]} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} /></label>)}
          <button>Add Food</button>
        </form>
      </div>
      <div className="panel">
        <h3>Nutrition Facts</h3>
        <div className="list">
          {foods.map((food) => (
            <article className="list-item" key={food._id}>
              <strong>{food.name}</strong>
              <span>{food.category} · {food.servingSize}{food.servingUnit}</span>
              <small>{food.calories} kcal · P {food.proteins}g · C {food.carbohydrates}g · F {food.fats}g</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
