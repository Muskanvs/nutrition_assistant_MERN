import React from "react";
import { useEffect, useState } from "react";
import { api } from "../../api";

export default function DietPlan({ setToast }) {
  const [plans, setPlans] = useState([]);

  async function load() {
    const data = await api("/plans");
    setPlans(data.plans);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function updateAdherence(plan, adherence) {
    await api(`/plans/${plan._id}`, { method: "PUT", body: JSON.stringify({ adherence: Number(adherence) }) });
    setToast("Adherence updated");
    await load();
  }

  return (
    <section className="plan-grid">
      {plans.map((plan) => (
        <article className="panel plan-card" key={plan._id}>
          <div className="plan-card-head">
            <div>
              <h3>{plan.title}</h3>
              <p>{plan.goal.replace("-", " ")} · {new Date(plan.startDate).toLocaleDateString()} to {new Date(plan.endDate).toLocaleDateString()}</p>
            </div>
            <strong>{plan.targetCalories} kcal</strong>
          </div>
          <div className="macro-line">
            <span>P {plan.targetProtein}g</span><span>C {plan.targetCarbs}g</span><span>F {plan.targetFats}g</span>
          </div>
          <label className="range-label">Adherence {plan.adherence}%
            <input type="range" min="0" max="100" value={plan.adherence} onChange={(e) => updateAdherence(plan, e.target.value)} />
          </label>
          <div className="days">
            {plan.days?.slice(0, 3).map((day) => (
              <div key={day.day}>
                <strong>{day.day}</strong>
                <span>{day.breakfast}</span>
                <span>{day.lunch}</span>
                <span>{day.dinner}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
      {!plans.length && <div className="panel"><h3>No diet plans yet</h3><p className="muted">Create a plan to start monitoring adherence and nutrition targets.</p></div>}
    </section>
  );
}
