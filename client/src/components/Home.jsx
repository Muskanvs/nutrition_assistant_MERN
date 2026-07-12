import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Flame, Scale, Salad, Target } from "lucide-react";
import MacroCard from "./MacroCard.jsx";

export default function Home({ user, go }) {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api("/reports/dashboard").then(setDashboard).catch(console.error);
  }, []);

  const targets = dashboard?.targets || user.targets || {};
  const totals = dashboard?.totals || {};

  return (
    <section className="page-grid">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Today</p>
          <h2>Stay close to your plan without turning food into math homework.</h2>
          <p>Log meals, review nutrition, and use recommendations that adapt to your profile, goal, and daily intake.</p>
          <div className="actions">
            <button onClick={() => go("log")}>Add Food</button>
            <button className="secondary" onClick={() => go("new-plan")}>Create Plan</button>
          </div>
        </div>
        <div className="score-ring" style={{ "--value": `${dashboard?.progress?.calories || 0}%` }}>
          <strong>{dashboard?.progress?.calories || 0}%</strong>
          <span>calorie target</span>
        </div>
      </div>
      <div className="macro-grid">
        <MacroCard icon={Flame} label="Calories" value={totals.calories || 0} target={targets.calories} unit="kcal" />
        <MacroCard icon={Salad} label="Protein" value={totals.proteins || 0} target={targets.proteins} unit="g" />
        <MacroCard icon={Target} label="Carbs" value={totals.carbohydrates || 0} target={targets.carbohydrates} unit="g" />
        <MacroCard icon={Scale} label="Fats" value={totals.fats || 0} target={targets.fats} unit="g" />
      </div>
      <div className="panel">
        <h3>Active Diet Plan</h3>
        {dashboard?.activePlan ? (
          <div className="plan-summary">
            <strong>{dashboard.activePlan.title}</strong>
            <span>{dashboard.activePlan.goal.replace("-", " ")} · {dashboard.activePlan.adherence}% adherence</span>
          </div>
        ) : (
          <p className="muted">No active plan yet. Create one from your profile targets and food preferences.</p>
        )}
      </div>
      <div className="panel">
        <h3>Customer Responsibilities</h3>
        <div className="check-list">
          <span>Keep profile metrics current</span>
          <span>Log foods with accurate quantity</span>
          <span>Review macros before final meals</span>
          <span>Use reports to adjust habits</span>
        </div>
      </div>
    </section>
  );
}
