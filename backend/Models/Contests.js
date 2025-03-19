const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  type: { type: String, required: true },
  contestLink: { type: String, required: false, default: "" }, // For contest link
  videoLink: { type: String, required: false, default: "" }, // For video link
  isBookmarked: { type: Boolean, default: false } // Bookmark feature
});

const Contest = mongoose.model("Contest", contestSchema);
module.exports = Contest;
