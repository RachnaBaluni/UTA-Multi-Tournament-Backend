const PricesBenifit = require("../models/PricesBenifit.model");

// ============================
// GET
// ============================
exports.getAllPricesBenifitService = async (tournamentId) => {
  try {
    const filter = {};

    if (tournamentId) {
      filter.tournamentId = tournamentId;
    }

    return await PricesBenifit.find(filter).sort({
      date: "desc",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============================
// CREATE
// ============================
exports.createPricesBenifitService = async (data) => {
  try {
    const newData = new PricesBenifit(data);

    return await newData.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============================
// UPDATE
// ============================
exports.updatePricesBenifitService = async (id, data) => {
  try {
    return await PricesBenifit.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// ============================
// DELETE
// ============================
exports.deletePricesBenifitService = async (id) => {
  try {
    return await PricesBenifit.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
