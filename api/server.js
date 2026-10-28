const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 1701;

app.use(cors());
app.use(express.json());

// In-memory storage: this array is the source of truth
let items = [
  {
    id: "1",
    title: "Milk",
    description: "2L low fat milk",
    createdAt: new Date().toISOString(),
    completed: false,
  },
];

// GET /items - return a summary of all items (no description)
app.get("/items", async (req, res) => {
  try {
    const summary = items.map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    }));
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the kitchen!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});