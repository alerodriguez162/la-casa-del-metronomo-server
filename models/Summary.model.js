// Iteration #1
const mongoose = require("mongoose");

const summarySchema = mongoose.Schema(
  {
    summary: {
      type: Object,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;
