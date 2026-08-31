const mongoose = require("mongoose");
const TournamentDetail = require("../models/TournamentDetail.model");

// GET TOURNAMENT DETAILS
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

// CREATE TOURNAMENT DETAIL
exports.createTournamentDetailService = async (tournamentData) => {
  try {
    const newDetail = new TournamentDetail(tournamentData);

    return await newDetail.save();
  } catch (error) {
    console.error("CREATE TOURNAMENT DETAIL SERVICE ERROR:", error);
    throw new Error(error.message);
  }
};

// UPDATE TOURNAMENT DETAIL
exports.updateTournamentDetailService = async (
  tournamentDetailId,
  tournamentData,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(tournamentDetailId)) {
      throw new Error("Invalid tournament detail ID");
    }

    return await TournamentDetail.findByIdAndUpdate(
      tournamentDetailId,
      tournamentData,
      {
        new: true,
        runValidators: true,
      },
    );
  } catch (error) {
    console.error("UPDATE TOURNAMENT DETAIL SERVICE ERROR:", error);
    throw new Error(error.message);
  }
};

// DELETE TOURNAMENT DETAIL
exports.deleteTournamentDetailService = async (tournamentDetailId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(tournamentDetailId)) {
      throw new Error("Invalid tournament detail ID");
    }

    return await TournamentDetail.findByIdAndDelete(tournamentDetailId);
  } catch (error) {
    console.error("DELETE TOURNAMENT DETAIL SERVICE ERROR:", error);
    throw new Error(error.message);
  }
};
