
import React from "react";
import { api } from "../../api";

export default function NewSuggestion({ setToast, go }) {
  async function generate() {
    await api("/suggestions/generate", { method: "POST" });
    setToast("Personalized suggestions generated");
    go("suggestions");
  }

  return (
    <section className="panel callout-page">
      <h3>Recommendations and Guidance</h3>
      <p>Generate personalized food, meal, plan, and guidance suggestions from your profile, active targets, and today's logged nutrition.</p>
      <button onClick={generate}>Generate Suggestions</button>
    </section>
  );
}
