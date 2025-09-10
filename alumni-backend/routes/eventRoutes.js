const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createEvent, getAllEvents, rsvpToEvent } = require('../controllers/eventController');

// @route   POST api/events
// @desc    Create an event
// @access  Private
router.post('/', authMiddleware, createEvent);

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', getAllEvents);

// @route   POST api/events/:id/rsvp
// @desc    RSVP to an event
// @access  Private
router.post('/:id/rsvp', authMiddleware, rsvpToEvent);

module.exports = router;
