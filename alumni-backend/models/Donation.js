const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Optional: Link to a specific fundraising campaign in the future
  campaign: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Donation', DonationSchema);
