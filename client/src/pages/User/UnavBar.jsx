import React from "react";
export default function UnavBar({ user }) {
  return (
    <div className="user-strip">
      <strong>{user.username}</strong>
      <span>{user.email}</span>
      <span>{user.goal?.replace("-", " ")}</span>
    </div>
  );
}
