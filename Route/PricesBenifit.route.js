const express = require("express");

const {
  getAllPricesBenifit,
  createPricesBenifit,
  updatePricesBenifit,
  deletePricesBenifit,
} = require("../Controllers/PricesBenifit.controller.js");

const { isAdmin } = require("../MiddleWare/authMiddleware");

const router = express.Router();

// GET
router.get("/", getAllPricesBenifit);

// ADMIN CREATE
router.post("/", isAdmin, createPricesBenifit);

// ADMIN UPDATE
router.put("/:id", isAdmin, updatePricesBenifit);

// ADMIN DELETE
router.delete("/:id", isAdmin, deletePricesBenifit);

module.exports = router;
