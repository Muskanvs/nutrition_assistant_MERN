const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export function getToken() {
  return localStorage.getItem("nutrition_token");
}

export function setSession(session) {
  localStorage.setItem("nutrition_token", session.token);
  localStorage.setItem("nutrition_user", JSON.stringify(session.user));
}

export function clearSession() {
  localStorage.removeItem("nutrition_token");
  localStorage.removeItem("nutrition_user");
}

export function getStoredUser() {
  const raw = localStorage.getItem("nutrition_user");
  if (!raw) return null;

  try {
    const user = JSON.parse(raw);
    return user && typeof user === "object" ? user : null;
  } catch {
    clearSession();
    return null;
  }
}

export async function api(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
