import React from "react";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";

export default function LandingPage({ go }) {
  return (
    <main className="public-page">
      <section className="landing">
        <div className="landing-copy">
          <span className="brandline"><Leaf size={20} /> Nutrition Assistant</span>
          <h1>Nutrition Assistant</h1>
          <p>Track food, build diet plans, review nutrition facts, and get personal guidance from one calm MERN stack workspace.</p>
          <div className="actions">
            <button onClick={() => go("register")}>Create Account <ArrowRight size={18} /></button>
            <button className="secondary" onClick={() => go("login")}>Login</button>
          </div>
        </div>
        <div className="landing-visual">
          <div className="meal-orbit">
            <span>Protein</span>
            <span>Carbs</span>
            <span>Fats</span>
          </div>
          <div className="glass-stat"><Sparkles size={18} /> Personalized plans</div>
          <div className="glass-stat bottom"><ShieldCheck size={18} /> JWT-secured profiles</div>
        </div>
      </section>
    </main>
  );
}
