const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMyProfile, createOrUpdateProfile } = require('../controllers/profileController');

// All routes in this file will be prefixed with /api/profile (from server.js)

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', authMiddleware, getMyProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', authMiddleware, createOrUpdateProfile);


module.exports = router;

