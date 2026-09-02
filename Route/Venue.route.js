const express = require("express");

const {
  getAllVenue,
  createVenue,
  updateVenue,
} = require("../Controllers/Venue.controller.js");

const router = express.Router();

router.get("/", getAllVenue);
router.post("/", createVenue);
router.put("/:id", (req, res, next) => {
  console.log("========== VENUE PUT ROUTE HIT ==========");
  console.log("VENUE ID:", req.params.id);
  console.log("VENUE BODY:", req.body);

  updateVenue(req, res, next);
});
module.exports = router;
