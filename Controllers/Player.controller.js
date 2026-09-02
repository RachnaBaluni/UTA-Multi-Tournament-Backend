const jwt = require("jsonwebtoken");

const PlayerService = require("../Services/Player.service.js");
const Team = require("../models/Team.model.js");
const Player = require("../models/Player.model.js");

const getPlayers = async (req, res) => {
  try {
    const players = await Team.find()
      .populate("partner1", "name _id")
      .populate("partner2", "name _id")
      .populate("eventId");
    res.status(200).json({
      success: true,
      message: "Fetched Players Successfully",
      data: players,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error Fetching the Players",
    });
  }
};

const RegisterPlayer = async (req, res) => {
  try {
    await PlayerService.RegisterPlayer(req.body);
    res.status(200).json({
      success: true,
      message: "Player and Team has been registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await PlayerService.loginPlayer({
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: data.id,
        playerType: data.playerType,
      },
      "secretkey123",
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: `Welcome ${data.name}`,
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        playerType: data.playerType,
        user: data.user,
      },
      token,
    });
  } catch (error) {
    console.log("LOGIN ERROR 👉", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getLoggedInPlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findById(id, "-feePaidAdmin");
    res.status(200).json({
      success: true,
      message: "Player Found Successfully",
      data: player,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Player Not Found",
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    await PlayerService.updatePlayer(
      req.params.id,
      req.body.formData,
      req.body.tournamentId,
    );
    res.status(200).json({
      success: true,
      message: `Your Personal Details have been updated`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTeams = async (req, res) => {
  try {
    await PlayerService.updateTeams(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: `Your Teams have been updated`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getPlayersWithDetails = async (req, res) => {
  try {
    const players = await PlayerService.getPlayersWithDetails();
    res.status(200).json({
      success: true,
      message: "Fetched Players Successfully",
      data: players,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getPlayersWithDetailsFrontend = async (req, res) => {
  try {
    const players = await PlayerService.getPlayersWithDetailsFrontend(
      req.params.tournamentId,
    );
    res.status(200).json({
      success: true,
      message: "Fetched Players Successfully",
      data: players,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleFeeStatus = async (req, res) => {
  try {
    const player = await PlayerService.toggleFeeStatus(req.params.id);
    res.status(200).json({
      success: true,
      message: "Fee Status Updated Successfully",
      data: player,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const result = await PlayerService.deletePlayerAndHandleTeams(
      req.params.id,
    );
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPlayerJourney = async (req, res) => {
  try {
    const result = await PlayerService.getPlayerJourney(req.params.playerId);
    res.status(200).json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyTournamentRegistrations = async (req, res) => {
  try {
    const playerId = req.params.playerId;

    const registrations =
      await PlayerService.getPlayerTournamentRegistrations(playerId);

    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error("GET PLAYER TOURNAMENT REGISTRATIONS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  RegisterPlayer,
  loginPlayer,
  getLoggedInPlayer,
  updatePlayer,
  updateTeams,
  getPlayers,
  getPlayersWithDetails,
  toggleFeeStatus,
  deletePlayer,
  getPlayersWithDetailsFrontend,
  getPlayerJourney,
  getMyTournamentRegistrations,
};
