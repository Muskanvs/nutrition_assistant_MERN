import React from "react";
import { Leaf } from "lucide-react";

export default function LNavbar({ items, active, onNavigate, user, onLogout }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate("home")}>
        <span className="brand-mark"><Leaf size={22} /></span>
        <span>
          <strong>Nutrient</strong>
          <small>Assistant</small>
        </span>
      </button>
      <nav>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => onNavigate(item.id)}>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-profile">
        <div className="avatar">{user.username?.slice(0, 1).toUpperCase()}</div>
        <div>
          <strong>{user.username}</strong>
          <small>{user.activityLevel?.replace("-", " ")}</small>
        </div>
      </div>
    </aside>
  );
}
