const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // This links each profile to a specific registered user.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The model to link to
    required: true,
    unique: true
  },
  // 'bio' helps with personal connection and networking.
  bio: {
    type: String,
    maxlength: 500
  },
  // 'major' and 'graduationYear' are key for filtering and finding peers.
  major: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
  // 'company' and 'jobTitle' are crucial for tracking career progress and mentorship opportunities.
  company: {
    type: String
  },
  jobTitle: {
    type: String
  },
  location: {
    type: String
  },
  // Social links are essential for modern networking.
  social: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    website: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);

