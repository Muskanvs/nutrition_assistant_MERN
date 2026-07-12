import React from "react";
import { useState } from "react";
import AuthShell from "./User/AuthShell.jsx";

export default function Login({ onSubmit, go }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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
    <AuthShell title="Welcome back" subtitle="Sign in to continue tracking your nutrition." go={go}>
      <form onSubmit={submit} className="auth-form">
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        {error && <p className="error">{error}</p>}
        <button>Login</button>
      </form>
    </AuthShell>
  );
}
