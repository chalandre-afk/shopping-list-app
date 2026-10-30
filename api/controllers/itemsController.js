// Controller layer: handles HTTP concerns (validation, status codes, JSON).
// Data work is delegated to the store.

const store = require("../data/itemsStore");

async function getItems(req, res) {
  try {
    const summary = store.getAll().map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    }));
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getItem(req, res) {
  try {
    const item = store.getById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function createItem(req, res) {
  try {
    const { title, description } = req.body;
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newItem = store.create({
      title: title.trim(),
      description: description || "",
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateItem(req, res) {
  try {
    const item = store.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteItem(req, res) {
  try {
    const removed = store.remove(req.params.id);
    if (!removed) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function clearItems(req, res) {
  try {
    store.clear();
    res.json({ message: "All items deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  clearItems,
};
