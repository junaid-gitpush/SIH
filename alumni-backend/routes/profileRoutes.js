const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMyProfile, createOrUpdateProfile } = require('../controllers/profileController');
const Profile = require('../models/Profile'); // Assuming your profile model is here

// All routes in this file will be prefixed with /api/profile (from server.js)

// =================================================================
// Original Routes
// =================================================================

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', authMiddleware, getMyProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', authMiddleware, createOrUpdateProfile);


// =================================================================
// Enhanced Alumni Directory Routes
// =================================================================

// @route   GET api/profile/all
// @desc    Get all alumni profiles (for directory)
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find({})
      .select('name email major graduationYear company jobTitle location bio linkedin skills profilePicture')
      .populate('user', 'name email')
      .sort({ graduationYear: -1, name: 1 });

    // Format data for frontend
    const formattedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.user?.name || profile.name,
      email: profile.user?.email || profile.email,
      graduationYear: profile.graduationYear,
      department: profile.major,
      jobTitle: profile.jobTitle,
      company: profile.company,
      location: profile.location,
      bio: profile.bio,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      profilePicture: profile.profilePicture || null,
    }));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    res.status(500).json({ message: 'Server error while fetching alumni profiles' });
  }
});

// @route   GET api/profile/search
// @desc    Search alumni by name, company, location, etc.
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search

    const profiles = await Profile.find({
      $or: [
        { name: searchRegex },
        { company: searchRegex },
        { location: searchRegex },
        { jobTitle: searchRegex },
        { major: searchRegex },
        { bio: searchRegex },
        { skills: { $in: [searchRegex] } }
      ]
    })
      .select('name email major graduationYear company jobTitle location bio linkedin skills profilePicture')
      .populate('user', 'name email')
      .sort({ graduationYear: -1, name: 1 });

    const formattedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.user?.name || profile.name,
      email: profile.user?.email || profile.email,
      graduationYear: profile.graduationYear,
      department: profile.major,
      jobTitle: profile.jobTitle,
      company: profile.company,
      location: profile.location,
      bio: profile.bio,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      profilePicture: profile.profilePicture || null,
    }));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({ message: 'Server error while searching alumni' });
  }
});

// @route   GET api/profile/filter
// @desc    Filter alumni by multiple criteria
// @access  Public
router.get('/filter', async (req, res) => {
  try {
    const { graduationYear, department, location, companyType, company } = req.query;

    let filter = {};

    // Build filter object
    if (graduationYear) {
      filter.graduationYear = parseInt(graduationYear);
    }

    if (department) {
      filter.major = department;
    }

    if (location) {
      filter.location = new RegExp(location, 'i');
    }

    if (company) {
      filter.company = new RegExp(company, 'i');
    }

    // Company type filtering (you can enhance this logic)
    if (companyType) {
      const techCompanies = ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Flipkart', 'Swiggy', 'Paytm', 'Zomato'];
      const financeCompanies = ['Deloitte', 'Goldman Sachs', 'JPMorgan', 'Citi'];
      const healthcareCompanies = ['Apollo', 'Fortis', 'Max Healthcare', 'Manipal'];
      const educationCompanies = ['Byju\'s', 'Unacademy', 'Vedantu'];

      let companyList = [];
      switch (companyType) {
        case 'Tech':
          companyList = techCompanies;
          break;
        case 'Finance':
          companyList = financeCompanies;
          break;
        case 'Healthcare':
          companyList = healthcareCompanies;
          break;
        case 'Education':
          companyList = educationCompanies;
          break;
      }

      if (companyList.length > 0) {
        filter.company = { $in: companyList.map(comp => new RegExp(comp, 'i')) };
      }
    }

    const profiles = await Profile.find(filter)
      .select('name email major graduationYear company jobTitle location bio linkedin skills profilePicture')
      .populate('user', 'name email')
      .sort({ graduationYear: -1, name: 1 });

    const formattedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.user?.name || profile.name,
      email: profile.user?.email || profile.email,
      graduationYear: profile.graduationYear,
      department: profile.major,
      jobTitle: profile.jobTitle,
      company: profile.company,
      location: profile.location,
      bio: profile.bio,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      profilePicture: profile.profilePicture || null,
    }));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error filtering profiles:', error);
    res.status(500).json({ message: 'Server error while filtering alumni' });
  }
});

// @route   GET api/profile/department/:department
// @desc    Get alumni by department
// @access  Public
router.get('/department/:department', async (req, res) => {
  try {
    const { department } = req.params;

    const profiles = await Profile.find({ major: department })
      .select('name email major graduationYear company jobTitle location bio linkedin skills profilePicture')
      .populate('user', 'name email')
      .sort({ graduationYear: -1, name: 1 });

    const formattedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.user?.name || profile.name,
      email: profile.user?.email || profile.email,
      graduationYear: profile.graduationYear,
      department: profile.major,
      jobTitle: profile.jobTitle,
      company: profile.company,
      location: profile.location,
      bio: profile.bio,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      profilePicture: profile.profilePicture || null,
    }));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error fetching profiles by department:', error);
    res.status(500).json({ message: 'Server error while fetching alumni by department' });
  }
});

// @route   GET api/profile/year/:year
// @desc    Get alumni by graduation year
// @access  Public
router.get('/year/:year', async (req, res) => {
  try {
    const { year } = req.params;

    const profiles = await Profile.find({ graduationYear: parseInt(year) })
      .select('name email major graduationYear company jobTitle location bio linkedin skills profilePicture')
      .populate('user', 'name email')
      .sort({ name: 1 });

    const formattedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.user?.name || profile.name,
      email: profile.user?.email || profile.email,
      graduationYear: profile.graduationYear,
      department: profile.major,
      jobTitle: profile.jobTitle,
      company: profile.company,
      location: profile.location,
      bio: profile.bio,
      linkedIn: profile.linkedin,
      skills: profile.skills || [],
      profilePicture: profile.profilePicture || null,
    }));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error fetching profiles by year:', error);
    res.status(500).json({ message: 'Server error while fetching alumni by year' });
  }
});

// @route   GET api/profile/stats
// @desc    Get alumni statistics for dashboard
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalAlumni = await Profile.countDocuments();

    // Group by graduation year
    const byYear = await Profile.aggregate([
      {
        $group: {
          _id: '$graduationYear',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    // Group by department
    const byDepartment = await Profile.aggregate([
      {
        $group: {
          _id: '$major',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Group by location
    const byLocation = await Profile.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Group by company
    const byCompany = await Profile.aggregate([
      {
        $group: {
          _id: '$company',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalAlumni,
      byYear,
      byDepartment,
      byLocation,
      byCompany
    });
  } catch (error) {
    console.error('Error fetching alumni stats:', error);
    res.status(500).json({ message: 'Server error while fetching alumni statistics' });
  }
});

// @route   POST api/profile/:id/contact
// @desc    Contact an alumni
// @access  Private
router.post('/:id/contact', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    // You can implement messaging logic here
    // For now, just return success
    res.json({
      message: 'Message sent successfully',
      recipientId: id,
      senderId: senderId
    });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ message: 'Server error while sending message' });
  }
});


module.exports = router;