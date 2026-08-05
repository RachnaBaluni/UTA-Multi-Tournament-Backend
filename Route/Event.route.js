const express = require("express");
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getRegistrationFields,
  updateRegistrationFields,
} = require("../Controllers/Events.controller.js");
const { isAdmin } = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", isAdmin, createEvent);
router.put("/:id", isAdmin, updateEvent);
router.delete("/:id", isAdmin, deleteEvent);
router.get("/registration-fields", getRegistrationFields);
router.put("/registration-fields", isAdmin, updateRegistrationFields);

module.exports = router;
