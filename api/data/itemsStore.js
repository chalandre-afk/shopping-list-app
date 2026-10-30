// Data layer: owns the in-memory array (the source of truth).
// Nothing outside this file touches the array directly,
// so swapping it for a database later only changes this file.

let items = [];
let nextId = 1;

function getAll() {
  return items;
}

function getById(id) {
  return items.find((item) => item.id === id);
}

function create({ title, description }) {
  const newItem = {
    id: String(nextId++),
    title,
    description,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  items.push(newItem);
  return newItem;
}

function update(id, changes) {
  const item = getById(id);
  if (!item) return undefined;
  if (typeof changes.completed === "boolean") {
    item.completed = changes.completed;
  }
  return item;
}

function remove(id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}

function clear() {
  items = [];
}

module.exports = { getAll, getById, create, update, remove, clear };
