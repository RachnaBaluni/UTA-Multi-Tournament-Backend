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
// ============================
// CREATE
// ============================
const createPricesBenifit = async (req, res) => {
  try {
    const { tournamentId, prizes } = req.body;

    if (!tournamentId) {
      return res.status(400).json({
        success: false,
        message: "Tournament ID is required.",
      });
    }

    if (!Array.isArray(prizes) || prizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one prize or benefit is required.",
      });
    }

    const createdPrizes = [];

    for (const prize of prizes) {
      if (!prize.key?.trim() || !prize.value?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Key and value are required for every prize or benefit.",
        });
      }

      const prizeData = {
        tournamentId,
        key: prize.key.trim(),
        value: prize.value.trim(),
        date: prize.date || new Date(),
        rules: prize.rules
          ? prize.rules
              .split("\n")
              .map((rule) => rule.trim())
              .filter(Boolean)
          : [],
        showing: prize.showing !== false,
      };

      const createdPrize =
        await pricesBenifitService.createPricesBenifitService(prizeData);

      createdPrizes.push(createdPrize);
    }

    res.status(201).json({
      success: true,
      data: createdPrizes,
      message: "Prizes & benefits created successfully.",
    });
  } catch (error) {
    console.error("CREATE PRIZES & BENEFITS ERROR:", error);

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
