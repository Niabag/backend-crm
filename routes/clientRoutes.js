const express = require("express");
const { registerClient, getClients, deleteClient } = require("../controllers/clientController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register/:userId", registerClient);
router.get("/", authMiddleware, getClients);
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;
