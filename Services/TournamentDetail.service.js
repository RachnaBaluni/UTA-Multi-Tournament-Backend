exports.getAllTournamentDetailService = async (tournamentId) => {
  try {
    if (tournamentId) {
      return await TournamentDetail.find({
        tournamentId: tournamentId,
        showing: true,
      }).sort({ key: 1 });
    }

    return await TournamentDetail.find({
      showing: true,
    }).sort({ key: 1 });
  } catch (error) {
    throw new Error(error.message);
  }
};
