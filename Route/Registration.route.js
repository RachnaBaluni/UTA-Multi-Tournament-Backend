const express = require("express");
const {
  getRegistrationFields,
  updateRegistrationFields,
} = require("../Controllers/Registration.controller");

const { isAdmin } = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.get("/", getRegistrationFields);

router.put("/", isAdmin, updateRegistrationFields);

module.exports = router;
