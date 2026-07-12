import React from "react";
export default function MacroCard({ icon: Icon, label, value = 0, target = 0, unit }) {
  const percent = target ? Math.min(100, Math.round((Number(value) / Number(target)) * 100)) : 0;
  return (
    <article className="macro-card">
      <div className="macro-head">
        <span><Icon size={18} /></span>
        <p>{label}</p>
      </div>
      <strong>{value}<small>{unit}</small></strong>
      <div className="progress"><i style={{ width: `${percent}%` }} /></div>
      <em>{target || 0}{unit} target</em>
    </article>
  );
}
