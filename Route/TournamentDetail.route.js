const express = require("express");

const {
  getAllTournamentDetails,
  createTournamentDetail,
  updateTournamentDetail,
  deleteTournamentDetail,
} = require("../Controllers/TournamentDetail.controller.js");

const router = express.Router();

// GET
router.get("/", getAllTournamentDetails);

// CREATE
router.post("/", createTournamentDetail);

// UPDATE
router.put("/:id", updateTournamentDetail);

// DELETE
router.delete("/:id", deleteTournamentDetail);

module.exports = router;
