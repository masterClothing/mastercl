const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/customers", userController.getAllCustomers);

module.exports = router;
