const express = require('express');
const getUserProfile = require('../controllers/profile.controller');
const verifyToken = require('../middleware/verifyToken'); // ✅ updated path

const profileRouter = express.Router();

// Protected route for user profile
profileRouter.get('/', verifyToken, getUserProfile);

module.exports = profileRouter;
