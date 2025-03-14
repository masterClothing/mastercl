const express = require("express");
const {
  signup,
  login,
  getProfile,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", logout);

module.exports = router;
