import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, updateItem, deleteItem } from "../api/itemsApi";

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        setItem(await getItem(id));
        setError("");
      } catch (err) {
        if (err.status === 404) {
          setError("Item not found.");
        } else {
          setError("Could not load the item. Is the backend running?");
        }
      }
    }
    loadItem();
  }, [id]);

  async function handleToggle() {
    try {
      setItem(await updateItem(id, { completed: !item.completed }));
    } catch (err) {
      setError("Could not update the item.");
    }
  }

  async function handleDelete() {
    try {
      await deleteItem(id);
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
