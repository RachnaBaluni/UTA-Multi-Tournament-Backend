const express = require("express");

const {
  getAllVenue,
  createVenue,
} = require("../Controllers/Venue.controller.js");

const router = express.Router();

router.get("/", getAllVenue);
router.post("/", createVenue);

module.exports = router;
