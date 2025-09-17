import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    major: '',
    graduationYear: '',
    company: '',
    jobTitle: '',
    location: '',
    bio: '',
    linkedin: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/profile/me', config);
        // If profile exists, populate the form with its data
        if (res.data) {
          setFormData({
            major: res.data.major || '',
            graduationYear: res.data.graduationYear || '',
            company: res.data.company || '',
            jobTitle: res.data.jobTitle || '',
            location: res.data.location || '',
            bio: res.data.bio || '',
            linkedin: res.data.linkedin || ''
          });
        }
      } catch (err) {
        // This can happen if the user has no profile yet, which is okay.
        console.log('No profile found, ready to create one.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post('http://localhost:5000/api/profile', formData, config);
      setMessage('Profile updated successfully!');
      // Hide the message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8"><h1 className="text-2xl font-bold">Loading Profile...</h1></div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Profile</h2>
      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Major */}
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major / Field of Study</label>
              <input
                type="text"
                name="major"
                id="major"
                value={formData.major}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Computer Science"
              />
            </div>
            {/* Graduation Year */}
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                id="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 2024"
              />
            </div>
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Current Company</label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Google"
              />
            </div>
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Software Engineer"
              />
            </div>
             {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., New Delhi, India"
              />
            </div>
             {/* LinkedIn Profile */}
             <div className="md:col-span-2">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
            {/* Bio */}
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Me</label>
              <textarea
                name="bio"
                id="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us a little about your career and interests."
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            {message && <p className="text-sm text-green-600 mr-4">{message}</p>}
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;