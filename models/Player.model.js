const mongoose = require("mongoose");

// Tournament-wise registration details
const tournamentRegistrationSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    shirtSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: false,
    },

    foodPref: {
      type: String,
      enum: ["Veg", "Non-Veg", "I Won't Be There"],
      required: false,
    },

    feePaid: {
      type: Boolean,
      default: false,
      required: false,
    },

    transactionDetails: {
      type: String,
      default: "",
      required: false,
    },
  },
  { _id: false },
);

const playerSchema = new mongoose.Schema(
  {
    // =========================
    // COMMON PLAYER DETAILS
    // =========================

    name: {
      type: String,
      required: true,
    },

    whatsappNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    // =========================
    // TOURNAMENT-WISE DETAILS
    // =========================

    tournamentRegistrations: {
      type: [tournamentRegistrationSchema],
      default: [],
    },

    // =========================
    // ADMIN FEE STATUS
    // =========================

    feePaidAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
