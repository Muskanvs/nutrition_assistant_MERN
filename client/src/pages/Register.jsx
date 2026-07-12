import React from "react";
import { useState } from "react";
import AuthShell from "./User/AuthShell.jsx";

const initial = {
  username: "",
  email: "",
  password: "",
  age: 28,
  weight: 70,
  height: 170,
  gender: "other",
  activityLevel: "moderate",
  goal: "balanced",
  dietaryPreference: "none"
};

export default function Register({ onSubmit, go }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell title="Create your profile" subtitle="Targets are calculated from your age, height, weight, gender, and activity level." go={go}>
      <form onSubmit={submit} className="auth-form two-col">
        <label>Username<input value={form.username} onChange={(e) => update("username", e.target.value)} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength="6" /></label>
        <label>Age<input type="number" value={form.age} onChange={(e) => update("age", Number(e.target.value))} /></label>
        <label>Weight kg<input type="number" value={form.weight} onChange={(e) => update("weight", Number(e.target.value))} /></label>
        <label>Height cm<input type="number" value={form.height} onChange={(e) => update("height", Number(e.target.value))} /></label>
        <label>Gender<select value={form.gender} onChange={(e) => update("gender", e.target.value)}><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></label>
        <label>Activity<select value={form.activityLevel} onChange={(e) => update("activityLevel", e.target.value)}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very-active">Very active</option></select></label>
        <label>Goal<select value={form.goal} onChange={(e) => update("goal", e.target.value)}><option value="weight-loss">Weight loss</option><option value="maintenance">Maintenance</option><option value="muscle-gain">Muscle gain</option><option value="balanced">Balanced</option></select></label>
        <label>Preference<select value={form.dietaryPreference} onChange={(e) => update("dietaryPreference", e.target.value)}><option value="none">None</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="high-protein">High protein</option><option value="low-carb">Low carb</option></select></label>
        {error && <p className="error full">{error}</p>}
        <button className="full">Register</button>
      </form>
    </AuthShell>
  );
}
