const mongoose = require("mongoose");

const pricesBenifitSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

const PricesBenifit = mongoose.model("PricesBenifit", pricesBenifitSchema);
module.exports = PricesBenifit;
