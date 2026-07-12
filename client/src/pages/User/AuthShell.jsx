import React from "react";
import { Leaf } from "lucide-react";

export default function AuthShell({ title, subtitle, children, go }) {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <button className="brand auth-brand" onClick={() => go("landing")}>
          <span className="brand-mark"><Leaf size={22} /></span>
          <span><strong>Nutrient</strong><small>Assistant</small></span>
        </button>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
        <div className="auth-switch">
          <button type="button" onClick={() => go("login")}>Login</button>
          <button type="button" onClick={() => go("register")}>Register</button>
        </div>
      </section>
    </main>
  );
}
