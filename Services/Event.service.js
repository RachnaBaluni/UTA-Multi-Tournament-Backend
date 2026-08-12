const Event = require("../models/Event.model");

eexports.getAllEventsService = async (tournamentId) => {
  try {
    const filter = {};

    if (tournamentId) {
      filter.tournamentId = tournamentId;
    }

    return await Event.find(filter).sort({ date: "desc" });
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.createEventService = async (eventData) => {
  try {
    const newEvent = new Event(eventData);
    return await newEvent.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateEventService = async (eventId, eventData) => {
  try {
    return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteEventService = async (eventId) => {
  try {
    return await Event.findByIdAndDelete(eventId);
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.getRegistrationFieldsService = async () => {
  try {
    const event = await Event.findOne();

    if (!event) {
      return {
        shirtSize: false,
        foodPreference: false,
        accommodation: false,
        feePaid: false,
        transactionDetails: false,
      };
    }

    return event.registrationFields;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateRegistrationFieldsService = async (fields) => {
  try {
    const event = await Event.findOneAndUpdate(
      {},
      {
        registrationFields: fields,
      },
      { new: true },
    );

    return event.registrationFields;
  } catch (error) {
    throw new Error(error.message);
  }
};
