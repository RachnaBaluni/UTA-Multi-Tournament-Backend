const mongoose = require("mongoose");

const tournamentRegistrationSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    shirtSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      default: null,
    },

    foodPref: {
      type: String,
      enum: ["Veg", "Non-Veg", "I Won't Be There"],
      default: null,
    },

    feePaid: {
      type: Boolean,
      default: false,
    },

    feePaidAdmin: {
      type: Boolean,
      default: false,
    },

    transactionDetails: {
      type: String,
      default: "",
    },

    accommodation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// one player only can register for one tournament
tournamentRegistrationSchema.index(
  { playerId: 1, tournamentId: 1 },
  { unique: true },
);

const TournamentRegistration = mongoose.model(
  "TournamentRegistration",
  tournamentRegistrationSchema,
);

module.exports = TournamentRegistration;
