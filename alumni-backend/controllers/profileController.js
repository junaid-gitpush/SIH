const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    // We use the user ID from the JWT middleware to find the profile.
    // .populate() fetches the 'name' from the linked User model.
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create or update a user profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  // Pull all the fields from the request body
  const {
    bio,
    major,
    graduationYear,
    company,
    jobTitle,
    location,
    linkedin,
    twitter,
    website
  } = req.body;

  // Build the main profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  if (major) profileFields.major = major;
  if (graduationYear) profileFields.graduationYear = graduationYear;
  if (company) profileFields.company = company;
  if (jobTitle) profileFields.jobTitle = jobTitle;
  if (location) profileFields.location = location;
  
  // Build the nested social object
  profileFields.social = {};
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;
  if (website) profileFields.social.website = website;

  try {
    // Find the profile by the logged-in user's ID
    let profile = await Profile.findOne({ user: req.user.id });

    // If profile exists, we update it
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true } // This returns the document after the update
      );
      return res.json(profile);
    }

    // If profile doesn't exist, we create a new one
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

