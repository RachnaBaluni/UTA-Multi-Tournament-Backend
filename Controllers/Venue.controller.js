const venueService = require("../Services/Venue.service");

const getAllVenue = async (req, res) => {
  try {
    const { tournamentId } = req.query;

    const venues = await venueService.getAllVenueService(tournamentId);

    res.status(200).json({
      success: true,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching venue.",
      error: error.message,
    });
  }
};

module.exports = { getAllVenue };
