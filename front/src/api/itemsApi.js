// API layer: the only place in the frontend that talks to the backend.
// Pages call these functions and never use fetch directly.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1701";

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function jsonOptions(method, body) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export function getItems() {
  return request("/items");
}

export function getItem(id) {
  return request(`/items/${id}`);
}

export function createItem({ title, description }) {
  return request("/items", jsonOptions("POST", { title, description }));
}

export function updateItem(id, changes) {
  return request(`/items/${id}`, jsonOptions("PUT", changes));
}

export function deleteItem(id) {
  return request(`/items/${id}`, { method: "DELETE" });
}

export function clearItems() {
  return request("/items", { method: "DELETE" });
}
