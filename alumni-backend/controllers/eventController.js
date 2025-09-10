const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (for now, any logged-in user can create one)
exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user.id // The logged-in user is the organizer
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by upcoming date
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    RSVP to an event
// @route   POST /api/events/:id/rsvp
// @access  Private
exports.rsvpToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the user has already RSVP'd
    if (event.attendees.some(attendee => attendee.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'User already RSVP\'d to this event' });
    }

    event.attendees.unshift(req.user.id);
    await event.save();

    res.json(event.attendees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
