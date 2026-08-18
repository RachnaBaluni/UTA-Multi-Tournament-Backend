const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    director: {
      type: String,
      required: true,
      trim: true,
    },

    directorPhone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  },
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
