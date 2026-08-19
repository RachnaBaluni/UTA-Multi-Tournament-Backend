const express = require("express");

const {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
} = require("../Controllers/Tournament.controller.js");

const { isAdmin } = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.get("/", getAllTournaments);
router.post("/", isAdmin, createTournament);
router.put("/:id", isAdmin, updateTournament);
router.delete("/:id", isAdmin, deleteTournament);
router.get("/:id", getTournamentById);
module.exports = router;
