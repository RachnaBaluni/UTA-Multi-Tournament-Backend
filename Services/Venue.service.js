const Venue = require("../models/Venue.model");

exports.getAllVenueService = async (tournamentId) => {
  try {
    if (tournamentId) {
      return await Venue.find({ tournamentId });
    }

    return await Venue.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createVenueService = async (data) => {
  try {
    return await Venue.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.updateVenueService = async (venueId, data) => {
  try {
    return await Venue.findByIdAndUpdate(venueId, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
