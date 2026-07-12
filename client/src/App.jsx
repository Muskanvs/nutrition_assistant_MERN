import React from "react";

import { useEffect, useState } from "react";
import { Activity, BarChart3, CalendarDays, Home, Lightbulb, LogOut, PlusCircle, Search, Settings, UserRound, Utensils } from "lucide-react";
import { api, clearSession, getStoredUser, setSession } from "./api";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./components/Home.jsx";
import UserData from "./pages/User/UserData.jsx";
import NewPlan from "./pages/Plans/NewPlan.jsx";
import DietPlan from "./pages/Plans/DietPlan.jsx";
import NewSuggestion from "./pages/Plans/NewSuggestion.jsx";
import SuggestedNutrition from "./pages/Plans/SuggestedNutrition.jsx";
import AdminView from "./pages/AdminView.jsx";
import Reports from "./pages/Reports.jsx";
import FoodLog from "./pages/FoodLog.jsx";
import LNavbar from "./components/LNavbar.jsx";
import "./App.css";


const navItems = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "log", label: "Food Log", icon: Utensils },
  { id: "new-plan", label: "New Plan", icon: PlusCircle },
  { id: "plans", label: "Diet Plans", icon: CalendarDays },
  { id: "suggest", label: "New Suggestion", icon: Lightbulb },
  { id: "suggestions", label: "Guidance", icon: Activity },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "admin", label: "Admin View", icon: Settings }
];

export default function App() {
  const [route, setRoute] = useState("landing");
  const [user, setUser] = useState(getStoredUser());
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user && ["landing", "login", "register"].includes(route)) setRoute("home");
  }, [user, route]);

  async function refreshProfile() {
    const data = await api("/users/me");
    localStorage.setItem("nutrition_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function handleAuth(path, payload) {
    const session = await api(path, { method: "POST", body: JSON.stringify(payload) });
    setSession(session);
    setUser(session.user);
    setRoute("home");
  }

  function logout() {
    clearSession();
    setUser(null);
    setRoute("landing");
  }

  const pageProps = { user, setUser, setToast, refreshProfile, go: setRoute };

  if (!user) {
    if (route === "login") return <Login onSubmit={(payload) => handleAuth("/users/login", payload)} go={setRoute} />;
    if (route === "register") return <Register onSubmit={(payload) => handleAuth("/users/register", payload)} go={setRoute} />;
    return <LandingPage go={setRoute} />;
  }

  const pages = {
    home: <HomePage {...pageProps} />,
    log: <FoodLog {...pageProps} />,
    "new-plan": <NewPlan {...pageProps} />,
    plans: <DietPlan {...pageProps} />,
    suggest: <NewSuggestion {...pageProps} />,
    suggestions: <SuggestedNutrition {...pageProps} />,
    reports: <Reports {...pageProps} />,
    profile: <UserData {...pageProps} />,
    admin: <AdminView {...pageProps} />
  };

  return (
    <div className="shell">
      <LNavbar items={navItems} active={route} onNavigate={setRoute} user={user} onLogout={logout} />
      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Nutrition Assistant</p>
            <h1>{navItems.find((item) => item.id === route)?.label || "Dashboard"}</h1>
          </div>
          <div className="search-pill">
            <Search size={16} />
            <span>{user.goal?.replace("-", " ") || "balanced"} goal</span>
          </div>
          <button className="icon-text subtle" onClick={logout} title="Log out">
            <LogOut size={18} /> Logout
          </button>
        </header>
        {toast && <div className="toast" onAnimationEnd={() => setToast("")}>{toast}</div>}
        {pages[route] || pages.home}
      </main>
    </div>
  );
}
