import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alumniAPI from '../services/alumniAPI'; // Assuming you have this service

const DashboardPage = () => {
  const [stats, setStats] = useState({
    profileCompletion: 0,
    upcomingEvents: 0,
    alumniCount: 0,
    totalDonations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API calls
        const profileData = await alumniAPI.getProfile();
        const eventsData = await alumniAPI.getEvents();
        const alumniData = await alumniAPI.getAllAlumni();
        const donationData = await alumniAPI.getDonations();

        setStats({
          profileCompletion: profileData.completionPercentage || 0,
          upcomingEvents: eventsData.length || 0,
          alumniCount: alumniData.length || 0,
          totalDonations: donationData.total || 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Alumni!</h2>

      {/* Grid for stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">My Profile</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{stats.profileCompletion}% Complete</p>
          </div>
          <Link to="/profile" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            Update Profile &rarr;
          </Link>
        </div>
        
        {/* Events Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">Upcoming Events</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{stats.upcomingEvents}</p>
          </div>
          <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            View Events &rarr;
          </Link>
        </div>

        {/* Directory Card */}
         <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">Alumni Directory</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{stats.alumniCount.toLocaleString()}+</p>
          </div>
          <Link to="/directory" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            Find Alumni &rarr;
          </Link>
        </div>

        {/* Donations Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">My Donations</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">${stats.totalDonations.toFixed(2)}</p>
          </div>
          <Link to="/donate" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            Donate Now &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
        <p className="text-gray-600 mt-4">No recent activity to display.</p>
      </div>
    </div>
  );
};

export default DashboardPage;