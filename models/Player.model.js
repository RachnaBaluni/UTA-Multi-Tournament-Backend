const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
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
    shirtSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: false,
    },
    shortSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: false,
    },
    foodPref: {
      type: String,
      enum: ["Veg", "Non-Veg", "I Won't Be There"],
    },
    stay: {
      type: Boolean,
      required: false,
      default: false,
    },
    feePaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    feePaidAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    transactionDetails: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true },
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
