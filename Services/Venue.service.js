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
    console.log("========== UPDATE VENUE DEBUG ==========");
    console.log("VENUE ID RECEIVED:", venueId);
    console.log("VENUE DATA:", data);

    const existingVenue = await Venue.findById(venueId);

    console.log("EXISTING VENUE:", existingVenue);

    if (!existingVenue) {
      console.log("❌ VENUE NOT FOUND IN DATABASE");
      return null;
    }

    const updatedVenue = await Venue.findByIdAndUpdate(venueId, data, {
      new: true,
      runValidators: true,
    });

    console.log("✅ UPDATED VENUE:", updatedVenue);

    return updatedVenue;
  } catch (error) {
    console.error("❌ UPDATE VENUE ERROR:", error);
    throw new Error(error.message);
  }
};
