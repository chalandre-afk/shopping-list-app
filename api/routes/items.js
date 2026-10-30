// Routing layer: maps HTTP method + path to a controller function.

const express = require("express");
const controller = require("../controllers/itemsController");

const router = express.Router();

router.get("/", controller.getItems);
router.get("/:id", controller.getItem);
router.post("/", controller.createItem);
router.put("/:id", controller.updateItem);
router.delete("/", controller.clearItems);
router.delete("/:id", controller.deleteItem);

module.exports = router;
