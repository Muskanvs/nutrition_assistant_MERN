
import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function SuggestedNutrition() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    api("/suggestions").then((data) => setSuggestions(data.suggestions)).catch(console.error);
  }, []);

  return (
    <section className="plan-grid">
      {suggestions.map((suggestion) => (
        <article className={`panel suggestion ${suggestion.priority}`} key={suggestion._id}>
          <span>{suggestion.category}</span>
          <h3>{suggestion.title}</h3>
          <p>{suggestion.message}</p>
          <small>Priority: {suggestion.priority}</small>
        </article>
      ))}
      {!suggestions.length && <div className="panel"><h3>No suggestions yet</h3><p className="muted">Generate a fresh set from the New Suggestion page.</p></div>}
    </section>
  );
}
