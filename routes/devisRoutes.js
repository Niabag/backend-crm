const express = require("express");
const {
  createDevis,
  getUserDevis,
  updateDevis,
  deleteDevis
} = require("../controllers/devisController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, createDevis);
router.get("/", authMiddleware, getUserDevis);
router.put("/:id", authMiddleware, updateDevis);
router.delete("/:id", authMiddleware, deleteDevis);

module.exports = router;
