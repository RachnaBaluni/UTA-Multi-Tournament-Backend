const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
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
    registrationFields: {
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
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
