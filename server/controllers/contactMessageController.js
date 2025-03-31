const { ContactMessage } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer (use your SMTP settings)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const contactMessageController = {
  // Get all messages
  getAllMessages: async (req, res) => {
    try {
      const messages = await ContactMessage.findAll();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  },

  // Reply to a message via email
  replyToMessage: async (req, res) => {
    const { messageId } = req.params;
    const { replyContent } = req.body;

    try {
      // Find the message in the database
      const message = await ContactMessage.findByPk(messageId);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      // Send email reply
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: message.email, // Use the email from the message
        subject: `Re: ${message.subject}`,
        text: replyContent,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: "Reply sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send reply" });
    }
  },
};

module.exports = contactMessageController;
