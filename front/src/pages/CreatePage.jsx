import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:1701";

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
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error("Failed to create item");
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