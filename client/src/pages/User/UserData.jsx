import React, {useEffect, useState } from "react";
import { api } from "../../api";
import UnavBar from "./UnavBar.jsx";

export default function UserData({ user, setUser, setToast, refreshProfile }) {
  const [form, setForm] = useState(user);

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function save(event) {
    event.preventDefault();
    const data = await api("/users/me", { method: "PUT", body: JSON.stringify(form) });
    localStorage.setItem("nutrition_user", JSON.stringify(data.user));
    setUser(data.user);
    setForm(data.user);
    setToast("Profile updated");
    await refreshProfile();
  }

  return (
    <section className="panel wide">
      <UnavBar user={user} />
      <form onSubmit={save} className="form-grid">
        <label>Username<input value={form.username || ""} onChange={(e) => update("username", e.target.value)} /></label>
        <label>Age<input type="number" value={form.age || ""} onChange={(e) => update("age", Number(e.target.value))} /></label>
        <label>Weight kg<input type="number" value={form.weight || ""} onChange={(e) => update("weight", Number(e.target.value))} /></label>
        <label>Height cm<input type="number" value={form.height || ""} onChange={(e) => update("height", Number(e.target.value))} /></label>
        <label>Gender<select value={form.gender} onChange={(e) => update("gender", e.target.value)}><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></label>
        <label>Activity<select value={form.activityLevel} onChange={(e) => update("activityLevel", e.target.value)}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very-active">Very active</option></select></label>
        <label>Goal<select value={form.goal} onChange={(e) => update("goal", e.target.value)}><option value="weight-loss">Weight loss</option><option value="maintenance">Maintenance</option><option value="muscle-gain">Muscle gain</option><option value="balanced">Balanced</option></select></label>
        <label>Preference<select value={form.dietaryPreference} onChange={(e) => update("dietaryPreference", e.target.value)}><option value="none">None</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="high-protein">High protein</option><option value="low-carb">Low carb</option></select></label>
        <button>Save Profile</button>
      </form>
    </section>
  );
}
