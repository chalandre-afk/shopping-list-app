import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:1701";

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await fetch(`${API_URL}/items/${id}`);
        if (response.status === 404) {
          setError("Item not found.");
          return;
        }
        if (!response.ok) throw new Error("Failed to load item");
        const data = await response.json();
        setItem(data);
        setError("");
      } catch (err) {
        setError("Could not load the item. Is the backend running?");
      }
    }
    loadItem();
  }, [id]);

  async function handleToggle() {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !item.completed }),
      });
      if (!response.ok) throw new Error("Failed to update item");
      const updated = await response.json();
      setItem(updated);
    } catch (err) {
      setError("Could not update the item.");
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      navigate("/list");
    } catch (err) {
      setError("Could not delete the item.");
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {item && (
        <div>
          <h1>Item: {item.title}</h1>
          <p>Description: {item.description || "No description"}</p>
          <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
          <p>Status: {item.completed ? "Completed" : "Not Completed"}</p>

          <button onClick={handleToggle}>
            {item.completed ? "Mark Not Complete" : "Mark Complete"}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <button onClick={() => navigate("/list")}>Back</button>
    </div>
  );
}

export default ItemDetailPage;