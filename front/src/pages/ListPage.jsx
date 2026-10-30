import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItems, updateItem, deleteItem, clearItems } from "../api/itemsApi";

function ListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loadItems() {
    try {
      setItems(await getItems());
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
      await updateItem(item.id, { completed: !item.completed });
      await loadItems();
    } catch (err) {
      setError("Could not update the item.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id);
      await loadItems();
    } catch (err) {
      setError("Could not delete the item.");
    }
  }

  async function handleClear() {
    if (!window.confirm("Clear the whole list?")) return;
    try {
      await clearItems();
      await loadItems();
    } catch (err) {
      setError("Could not clear the list.");
    }
  }

  return (
    <div>
      <h1>?? Shopping List</h1>

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
