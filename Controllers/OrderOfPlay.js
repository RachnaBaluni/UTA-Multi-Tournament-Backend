const OrderOfPlay = require("../models/OrderOfPlay.model.js");

// ---------------- SAVE ----------------
const saveOrderOfPlay = async (req, res) => {
  try {
    const eventId = req.body?.eventId;
    const playDate = req.body?.playDate;
    const grid = req.body?.grid;
    console.log("SAVE REQUEST", {
      eventId,
      playDate,
      gridRows: grid?.length,
    });

    console.log("===== GRID SAMPLE START =====");
    console.dir(grid[0], { depth: null });
    console.log("===== GRID SAMPLE END =====");

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "eventId missing",
      });
    }

    const saved = await OrderOfPlay.findOneAndUpdate(
      {
        eventId,
        playDate,
      },
      {
        eventId,
        playDate,
        grid,
      },
      {
        upsert: true,
        new: true,
      },
    );
    console.log("SAVED =>", saved);

    return res.json({
      success: true,
      data: saved,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ---------------- GET ----------------
const getOrderOfPlay = async (req, res) => {
  try {
    console.log("PARAMS =>", req.params);

    const data = await OrderOfPlay.find({
      eventId: req.params.eventId,
    }).sort({ playDate: 1 });
    console.log("FOUND =>", data);

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log("ERROR =>", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- DELETE DAY ----------------
const deleteOrderOfPlay = async (req, res) => {
  try {
    const { eventId, playDate } = req.params;

    console.log("DELETE ORDER OF PLAY", {
      eventId,
      playDate,
    });

    const deleted = await OrderOfPlay.findOneAndDelete({
      eventId,
      playDate,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Order of play for this day not found",
      });
    }

    return res.json({
      success: true,
      message: "Day deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.error("DELETE ORDER OF PLAY ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  saveOrderOfPlay,
  getOrderOfPlay,
  deleteOrderOfPlay,
};
