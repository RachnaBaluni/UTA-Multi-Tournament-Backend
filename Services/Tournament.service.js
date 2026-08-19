const Tournament = require("../models/Tournament.model");

exports.getAllTournamentsService = async () => {
  try {
    return await Tournament.find().sort({ startDate: "desc" });
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getTournamentByIdService = async (tournamentId) => {
  try {
    return await Tournament.findById(tournamentId);
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.createTournamentService = async (tournamentData) => {
  try {
    const newTournament = new Tournament(tournamentData);
    return await newTournament.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateTournamentService = async (tournamentId, tournamentData) => {
  try {
    return await Tournament.findByIdAndUpdate(tournamentId, tournamentData, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteTournamentService = async (tournamentId) => {
  try {
    return await Tournament.findByIdAndDelete(tournamentId);
  } catch (error) {
    throw new Error(error.message);
  }
};
