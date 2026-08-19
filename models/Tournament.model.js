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
    registrationFields: {
      shirtSize: {
        type: Boolean,
        default: false,
      },

      foodPreference: {
        type: Boolean,
        default: false,
      },
      accommodation: {
        type: Boolean,
        default: false,
      },
      feePaid: {
        type: Boolean,
        default: false,
      },
      transactionDetails: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
