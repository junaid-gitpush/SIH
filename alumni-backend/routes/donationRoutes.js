const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { makeDonation, getAllDonations } = require('../controllers/donationController');

// @route   POST api/donations
// @desc    Record a new donation
// @access  Private
router.post('/', authMiddleware, makeDonation);

// @route   GET api/donations
// @desc    Get all donations
// @access  Private
router.get('/', authMiddleware, getAllDonations);

module.exports = router;
