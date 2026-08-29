const mongoose = require("mongoose");
const TournamentDetail = require("../models/TournamentDetail.model");

exports.getAllTournamentDetailService = async (tournamentId) => {
  try {
    if (tournamentId) {
      if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
        throw new Error("Invalid tournament ID");
      }

      return await TournamentDetail.find({
        tournamentId: tournamentId,
        showing: true,
      }).sort({ key: 1 });
    }

    return await TournamentDetail.find({
      showing: true,
    }).sort({ key: 1 });
  } catch (error) {
    console.error("GET TOURNAMENT DETAILS SERVICE ERROR:", error);
    throw new Error(error.message);
  }
};
