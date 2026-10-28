import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:1701";

function ListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loadItems() {
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error("Failed to load items");
      const data = await response.json();
      setItems(data);
      setError("");
    } catch (err) {
      setError("Could not load the shopping list. Is the backend running?");
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleToggle(item) {
    try {
      const response = await fetch(`${API_URL}/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !item.completed }),
      });
      if (!response.ok) throw new Error("Failed to update item");
      await loadItems();
    } catch (err) {
      setError("Could not update the item.");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      await loadItems();
    } catch (err) {
      setError("Could not delete the item.");
    }
  }

  async function handleClear() {
    try {
      const response = await fetch(`${API_URL}/items`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to clear list");
      await loadItems();
    } catch (err) {
      setError("Could not clear the list.");
    }
  }

  return (
    <div>
      <h1>🛒 Shopping List</h1>

      <button onClick={() => navigate("/create")}>Add Item</button>
      <button onClick={handleClear}>Clear List</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {items.length === 0 && !error ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item)}
              />
              <Link to={`/list-item/${item.id}`}>{item.title}</Link>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListPage;