import React from "react";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api("/reports/progress?days=7").then(setReport).catch(console.error);
  }, []);

  const max = Math.max(...(report?.series || []).map((day) => day.calories), report?.targets?.calories || 1);

  return (
    <section className="panel wide">
      <h3>Reporting and Progress Tracking</h3>
      <div className="chart">
        {(report?.series || []).map((day) => (
          <div className="bar-row" key={day.date}>
            <span>{new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}</span>
            <div><i style={{ width: `${(day.calories / max) * 100}%` }} /></div>
            <strong>{day.calories} kcal</strong>
          </div>
        ))}
      </div>
      <div className="insight-grid">
        <div><strong>{report?.totalMeals || 0}</strong><span>Meals logged</span></div>
        <div><strong>{report?.targets?.calories || 0}</strong><span>Daily kcal target</span></div>
        <div><strong>{report?.targets?.proteins || 0}g</strong><span>Protein target</span></div>
      </div>
    </section>
  );
}
