const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 1701;

app.use(cors());
app.use(express.json());

// In-memory storage: this array is the source of truth
let items = [];

// Simple id generator: a counter that goes up each time
let nextId = 1;

// GET /items - summary of all items (no description)
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

// GET /items/:id - one full item
app.get("/items/:id", async (req, res) => {
  try {
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /items - create a new item
app.post("/items", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newItem = {
      id: String(nextId++),
      title: title.trim(),
      description: description || "",
      createdAt: new Date().toISOString(),
      completed: false,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT /items/:id - update an item (e.g. mark as completed)
app.put("/items/:id", async (req, res) => {
  try {
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (typeof req.body.completed === "boolean") {
      item.completed = req.body.completed;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE /items - clear all items
app.delete("/items", async (req, res) => {
  try {
    items = [];
    res.json({ message: "All items deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE /items/:id - delete one item
app.delete("/items/:id", async (req, res) => {
  try {
    const index = items.findIndex((i) => i.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    items.splice(index, 1);
    res.json({ message: "Item deleted" });
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