import React from "react";
import { useState } from "react";
import { api } from "../../api";

export default function NewPlan({ user, setToast, go }) {
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(Date.now() + 6 * 86400000).toISOString().slice(0, 10);
  const [form, setForm] = useState({
    title: "Personalized weekly plan",
    goal: user.goal || "balanced",
    startDate: today,
    endDate: nextWeek,
    preferences: user.dietaryPreference ? [user.dietaryPreference] : [],
    restrictions: []
  });

  async function submit(event) {
    event.preventDefault();
    await api("/plans", { method: "POST", body: JSON.stringify(form) });
    setToast("Diet plan created");
    go("plans");
  }

  return (
    <section className="panel wide">
      <h3>Diet Plan Creation</h3>
      <form className="form-grid" onSubmit={submit}>
        <label>Plan title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Goal<select value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}><option value="weight-loss">Weight loss</option><option value="maintenance">Maintenance</option><option value="muscle-gain">Muscle gain</option><option value="balanced">Balanced</option></select></label>
        <label>Start date<input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></label>
        <label>End date<input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></label>
        <label>Preferences<input value={form.preferences.join(", ")} onChange={(e) => setForm({ ...form, preferences: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} /></label>
        <label>Restrictions<input placeholder="nuts, lactose, gluten" value={form.restrictions.join(", ")} onChange={(e) => setForm({ ...form, restrictions: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} /></label>
        <button>Create Plan</button>
      </form>
    </section>
  );
}
