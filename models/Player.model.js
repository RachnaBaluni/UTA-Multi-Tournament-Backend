const Player = require("../models/Player.model.js");
const Team = require("../models/Team.model.js");
const Event = require("../models/Event.model.js");
const Nissan_Draws = require("../models/Nissan_Draws.model.js");
const Tournament = require("../models/Tournament.model.js");

const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const FOOD_PREFS = ["Veg", "Non-Veg", "I Won't Be There"];

const RegisterPlayer = async (data) => {
  console.log("🔥 REGISTER BODY:", JSON.stringify(data, null, 2));

  const { event1, event2, partner1, partner2 } = data;

  // =========================================================
  // 1. EVENT 1 VALIDATION
  // =========================================================

  if (!event1 || typeof event1 !== "string" || !event1.trim()) {
    throw new Error("Event 1 cannot be empty.");
  }

  const Event1 = await Event.findById(event1);

  if (!Event1) {
    throw new Error("Invalid Id for Event 1.");
  }

  // =========================================================
  // 2. GET TOURNAMENT
  // =========================================================

  const Tournament1 = await Tournament.findById(Event1.tournamentId);

  if (!Tournament1) {
    throw new Error("Invalid Tournament.");
  }

  const registrationFields = Tournament1.registrationFields || {};

  console.log("🔥 TOURNAMENT REGISTRATION FIELDS:", registrationFields);

  // =========================================================
  // 3. BASIC REQUIRED FIELDS
  // =========================================================

  const requiredFields = ["name", "whatsappNumber", "dob", "city"];

  // =========================================================
  // 4. DYNAMIC REQUIRED FIELDS
  // =========================================================

  if (registrationFields.shirtSize) {
    requiredFields.push("shirtSize", "shortSize");
  }

  if (registrationFields.foodPreference) {
    requiredFields.push("foodPref");
  }

  if (registrationFields.accommodation) {
    requiredFields.push("stay");
  }

  if (registrationFields.feePaid) {
    requiredFields.push("feePaid");
  }

  // =========================================================
  // 5. CHECK REQUIRED FIELDS
  // =========================================================

  for (const field of requiredFields) {
    if (
      !Object.prototype.hasOwnProperty.call(data, field) ||
      data[field] === undefined ||
      data[field] === null ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      throw new Error(
        `Please fill all the details. Missing or invalid field: ${field}`,
      );
    }
  }

  // =========================================================
  // 6. BASIC PLAYER DATA
  // =========================================================

  const playerData = {
    name: data.name,
    whatsappNumber: data.whatsappNumber,
    dob: data.dob,
    city: data.city,
  };

  // =========================================================
  // 7. SHIRT SIZE
  // =========================================================

  if (registrationFields.shirtSize) {
    playerData.shirtSize = data.shirtSize;
    playerData.shortSize = data.shortSize;

    console.log("🔥 SHIRT SIZE:", playerData.shirtSize);
    console.log("🔥 SHORT SIZE:", playerData.shortSize);

    if (!SHIRT_SIZES.includes(playerData.shirtSize)) {
      throw new Error("Shirt Size Option is not correct.");
    }

    if (!SHIRT_SIZES.includes(playerData.shortSize)) {
      throw new Error("Short Size Option is not correct.");
    }
  }

  // =========================================================
  // 8. FOOD PREFERENCE
  // =========================================================

  if (registrationFields.foodPreference) {
    playerData.foodPref = data.foodPref;

    console.log("🔥 FOOD PREF:", playerData.foodPref);

    if (!FOOD_PREFS.includes(playerData.foodPref)) {
      throw new Error("Incorrect Food Preference.");
    }
  }

  // =========================================================
  // 9. ACCOMMODATION
  // =========================================================

  if (registrationFields.accommodation) {
    playerData.stay = data.stay;
  }

  // =========================================================
  // 10. FEE PAID
  // =========================================================

  if (registrationFields.feePaid) {
    playerData.feePaid = data.feePaid;

    // Transaction details are only required
    // when feePaid is true
    if (data.feePaid === true) {
      if (
        !data.transactionDetails ||
        typeof data.transactionDetails !== "string" ||
        !data.transactionDetails.trim()
      ) {
        throw new Error("Transaction details are required if fee is paid.");
      }

      playerData.transactionDetails = data.transactionDetails.trim();
    }
  }

  // =========================================================
  // 11. PHONE VALIDATION
  // =========================================================

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(playerData.whatsappNumber.toString())) {
    throw new Error("Phone Number is not correct.");
  }

  // =========================================================
  // 12. DOB VALIDATION
  // =========================================================

  if (new Date(playerData.dob) > new Date()) {
    throw new Error("Date Of Birth is not correct (cannot be in the future).");
  }

  // =========================================================
  // 13. DUPLICATE PLAYER
  // =========================================================

  const duplicatePlayer = await Player.findOne({
    whatsappNumber: playerData.whatsappNumber,
  });

  if (duplicatePlayer) {
    throw new Error("The Whatsapp Number is already Registered.");
  }

  // =========================================================
  // 14. EVENT 2
  // =========================================================

  if (event2 && event2 === event1) {
    throw new Error("Event 1 and Event 2 cannot be the same.");
  }

  let Event2 = null;

  if (event2) {
    Event2 = await Event.findById(event2);

    if (!Event2) {
      throw new Error("Invalid Id for Event 2.");
    }
  }

  // =========================================================
  // 15. PARTNER 1
  // =========================================================

  let Partner1Team = null;

  if (partner1) {
    const Partner1 = await Player.findById(partner1);

    if (!Partner1) {
      throw new Error("Partner 1 Id is incorrect.");
    }

    Partner1Team = await Team.findOne({
      eventId: event1,
      partner1: partner1,
      $or: [{ partner2: null }, { partner2: { $exists: false } }],
    });

    if (!Partner1Team) {
      throw new Error(
        `Could not find an open team for Partner 1 (${Partner1.name}) in Event 1.`,
      );
    }

    if (Partner1Team.partner2) {
      throw new Error(
        `Partner 1 (${Partner1.name}) already has a partner in Event 1.`,
      );
    }
  }

  // =========================================================
  // 16. PARTNER 2
  // =========================================================

  let Partner2Team = null;

  if (event2 && partner2) {
    const Partner2 = await Player.findById(partner2);

    if (!Partner2) {
      throw new Error("Partner 2 Id is incorrect.");
    }

    Partner2Team = await Team.findOne({
      eventId: event2,
      partner1: partner2,
      $or: [{ partner2: null }, { partner2: { $exists: false } }],
    });

    if (!Partner2Team) {
      throw new Error(
        `Could not find an open team for Partner 2 (${Partner2.name}) in Event 2.`,
      );
    }

    if (Partner2Team.partner2) {
      throw new Error(
        `Partner 2 (${Partner2.name}) already has a partner in Event 2.`,
      );
    }
  }

  // =========================================================
  // 17. CREATE PLAYER
  // =========================================================

  console.log("🔥 FINAL PLAYER DATA:", playerData);

  const registerPlayer = await Player.create(playerData);

  if (!registerPlayer) {
    throw new Error("Failed to register player.");
  }

  // =========================================================
  // 18. EVENT 1 TEAM
  // =========================================================

  if (Partner1Team) {
    Partner1Team.partner2 = registerPlayer._id;
    await Partner1Team.save();
  } else {
    const lastRank1 = await Team.findOne({
      eventId: event1,
    })
      .sort({ rank: -1 })
      .exec();

    const newRank1 = lastRank1 ? lastRank1.rank + 1 : 1;

    await Team.create({
      eventId: event1,
      partner1: registerPlayer._id,
      partner2: null,
      rank: newRank1,
    });
  }

  // =========================================================
  // 19. EVENT 2 TEAM
  // =========================================================

  if (event2) {
    if (Partner2Team) {
      Partner2Team.partner2 = registerPlayer._id;
      await Partner2Team.save();
    } else {
      const lastRank2 = await Team.findOne({
        eventId: event2,
      })
        .sort({ rank: -1 })
        .exec();

      const newRank2 = lastRank2 ? lastRank2.rank + 1 : 1;

      await Team.create({
        eventId: event2,
        partner1: registerPlayer._id,
        partner2: null,
        rank: newRank2,
      });
    }
  }

  return registerPlayer;
};
