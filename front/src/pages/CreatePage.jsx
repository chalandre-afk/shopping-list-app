import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api/itemsApi";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    try {
      await createItem({ title, description });
      navigate("/list");
    } catch (err) {
      setError("Could not create the item. Is the backend running?");
    }
  }

  return (
    <div>
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Description:{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate("/list")}>
          Back
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
