const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = 1701;

app.use(cors());
app.use(express.json());

// Every route in routes/items.js is mounted under /items
app.use("/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Hello from the kitchen!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
