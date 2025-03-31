const express = require("express");
const router = express.Router();
const contactMessageController = require("../controllers/contactMessageController");

router.get("/messages", contactMessageController.getAllMessages);

router.post(
  "/messages/:messageId/reply",
  contactMessageController.replyToMessage
);

module.exports = router;
