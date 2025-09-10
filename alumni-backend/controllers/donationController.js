const Donation = require('../models/Donation');

// @desc    Record a new donation
// @route   POST /api/donations
// @access  Private
exports.makeDonation = async (req, res) => {
  const { amount, campaign } = req.body;

  // Basic validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: 'Please provide a valid amount' });
  }

  try {
    const newDonation = new Donation({
      amount,
      campaign,
      donor: req.user.id, // The logged-in user is the donor
    });

    const donation = await newDonation.save();
    res.json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all donations (for admin purposes)
// @route   GET /api/donations
// @access  Private (should be restricted to admins in the future)
exports.getAllDonations = async (req, res) => {
  try {
    // We populate 'donor' to get user details, selecting only name and email
    const donations = await Donation.find()
      .populate('donor', ['name', 'email'])
      .sort({ date: -1 }); // Show most recent first
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

