const tournamentService = require("../Services/Tournament.service");

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await tournamentService.getAllTournamentsService();

    res.status(200).json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    console.error("GET ALL TOURNAMENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching tournaments.",
      error: error.message,
    });
  }
};

const createTournament = async (req, res) => {
  try {
    const newTournament = await tournamentService.createTournamentService(
      req.body,
    );

    res.status(201).json({
      success: true,
      data: newTournament,
      message: "Tournament created successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating tournament.",
      error: error.message,
    });
  }
};

const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTournament = await tournamentService.updateTournamentService(
      id,
      req.body,
    );

    if (!updatedTournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTournament,
      message: "Tournament updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating tournament.",
      error: error.message,
    });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTournament =
      await tournamentService.deleteTournamentService(id);

    if (!deletedTournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tournament deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting tournament.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTournaments,
  createTournament,
  updateTournament,
  deleteTournament,
};
