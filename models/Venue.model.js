const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rules: {
      type: [String],
      default: [],
    },
    showing: {
      type: Boolean,
      default: true,
    },
    mapLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
