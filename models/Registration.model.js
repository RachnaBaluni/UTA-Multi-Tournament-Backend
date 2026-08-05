const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    shirtSize: {
      type: Boolean,
      default: true,
    },
    foodPreference: {
      type: Boolean,
      default: true,
    },
    accommodation: {
      type: Boolean,
      default: true,
    },
    feePaid: {
      type: Boolean,
      default: true,
    },
    transactionDetails: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
