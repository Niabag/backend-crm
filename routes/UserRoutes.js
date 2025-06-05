const express = require("express");
const { register, login, getUser } = require("../controllers/userController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getUser);

module.exports = router;
