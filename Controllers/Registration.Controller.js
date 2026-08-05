const Registration = require("../models/Registration.model");

// Get registration fields
const getRegistrationFields = async (req, res) => {
  try {
    let fields = await Registration.findOne();

    // agar pehli baar hai to default create kar do
    if (!fields) {
      fields = await Registration.create({});
    }

    res.status(200).json({
      success: true,
      data: fields,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update registration fields
const updateRegistrationFields = async (req, res) => {
  try {
    let fields = await Registration.findOne();

    if (!fields) {
      fields = new Registration(req.body);
    } else {
      Object.assign(fields, req.body);
    }

    await fields.save();

    res.status(200).json({
      success: true,
      message: "Registration fields updated successfully",
      data: fields,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRegistrationFields,
  updateRegistrationFields,
};
