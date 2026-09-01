const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    // ============================
    // TOURNAMENT NAME
    // ============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ============================
    // TOURNAMENT TYPE
    // ============================
    type: {
      type: String,
      enum: ["normal", "display"],
      default: "normal",
    },

    // ============================
    // DISPLAY TOURNAMENT FIELDS
    // ============================
    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
    },

    location: {
      type: String,
      trim: true,
    },

    organizer: {
      type: String,
      trim: true,
    },

    // ============================
    // NORMAL TOURNAMENT FIELDS
    // ============================
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    director: {
      type: String,
      trim: true,
    },

    directorPhone: {
      type: String,
      trim: true,
    },
    // ============================
    // ENTRY & PARTICIPATION
    // ============================
    entryParticipationRules: {
      type: [String],
      default: [],
    },

    registrationStartDate: {
      type: Date,
    },

    registrationEndDate: {
      type: Date,
    },

    // ============================
    // STATUS
    // ============================
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed"],
      default: "Upcoming",
    },
    registrationStartDate: {
      type: Date,
    },

    registrationEndDate: {
      type: Date,
    },

    entryParticipationRules: {
      type: [String],
      default: [],
    },

    // ============================
    // TOURNAMENT DETAILS
    // ============================
    tournamentDetails: [
      {
        key: {
          type: String,
          required: true,
        },

        title: {
          type: String,
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
      },
    ],

    // ============================
    // PRIZES & BENEFITS
    // ============================
    prizesBenefits: [
      {
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
      },
    ],
    // ============================
    // REGISTRATION FIELDS
    // ============================
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
