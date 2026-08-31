const tournamentDetailService = require("../Services/TournamentDetail.service");

// GET ALL TOURNAMENT DETAILS
const getAllTournamentDetails = async (req, res) => {
  try {
    const { tournamentId } = req.query;

    const details =
      await tournamentDetailService.getAllTournamentDetailService(tournamentId);

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    console.error("GET TOURNAMENT DETAILS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching tournament details.",
      error: error.message,
    });
  }
};

// CREATE TOURNAMENT DETAIL
const createTournamentDetail = async (req, res) => {
  try {
    const detail = await tournamentDetailService.createTournamentDetailService(
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Tournament detail created successfully.",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating tournament detail.",
      error: error.message,
    });
  }
};
// UPDATE TOURNAMENT DETAIL
const updateTournamentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const detail = await tournamentDetailService.updateTournamentDetailService(
      id,
      req.body,
    );

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: "Tournament detail not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: detail,
      message: "Tournament detail updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE TOURNAMENT DETAIL ERROR:", error);

    res.status(400).json({
      success: false,
      message: "Error updating tournament detail.",
      error: error.message,
    });
  }
};

// DELETE TOURNAMENT DETAIL
const deleteTournamentDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const detail =
      await tournamentDetailService.deleteTournamentDetailService(id);

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: "Tournament detail not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tournament detail deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE TOURNAMENT DETAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error deleting tournament detail.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTournamentDetails,
  createTournamentDetail,
  updateTournamentDetail,
  deleteTournamentDetail,
};
