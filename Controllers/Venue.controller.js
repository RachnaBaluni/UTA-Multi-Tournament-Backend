const venueService = require("../Services/Venue.service");

const getAllVenue = async (req, res) => {
  try {
    const venues = await venueService.getAllVenueService(
      req.query.tournamentId,
    );
    res.status(200).json({
      success: true,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching venues.",
      error: error.message,
    });
  }
};

const createVenue = async (req, res) => {
  try {
    const venue = await venueService.createVenueService(req.body);

    res.status(201).json({
      success: true,
      message: "Venue created successfully.",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating venue.",
      error: error.message,
    });
  }
};

const updateVenue = async (req, res) => {
  try {
    const venue = await venueService.updateVenueService(
      req.params.id,
      req.body,
    );

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venue updated successfully.",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating venue.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllVenue,
  createVenue,
  updateVenue,
};
