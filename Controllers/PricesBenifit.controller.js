const pricesBenifitService = require("../Services/PricesBenifit.service");

// ============================
// GET ALL
// ============================
const getAllPricesBenifit = async (req, res) => {
  try {
    const { tournamentId } = req.query;

    const data =
      await pricesBenifitService.getAllPricesBenifitService(tournamentId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prizes & benefits.",
      error: error.message,
    });
  }
};

// ============================
// CREATE
// ============================
const createPricesBenifit = async (req, res) => {
  try {
    const data = await pricesBenifitService.createPricesBenifitService(
      req.body,
    );

    res.status(201).json({
      success: true,
      data,
      message: "Prizes & benefits created successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating prizes & benefits.",
      error: error.message,
    });
  }
};

// ============================
// UPDATE
// ============================
const updatePricesBenifit = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await pricesBenifitService.updatePricesBenifitService(
      id,
      req.body,
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Prizes & benefits not found.",
      });
    }

    res.status(200).json({
      success: true,
      data,
      message: "Prizes & benefits updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating prizes & benefits.",
      error: error.message,
    });
  }
};

// ============================
// DELETE
// ============================
const deletePricesBenifit = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await pricesBenifitService.deletePricesBenifitService(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Prizes & benefits not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prizes & benefits deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting prizes & benefits.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPricesBenifit,
  createPricesBenifit,
  updatePricesBenifit,
  deletePricesBenifit,
};
