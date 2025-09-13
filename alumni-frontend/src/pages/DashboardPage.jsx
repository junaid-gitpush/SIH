import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Alumni!</h2>

      {/* Grid for stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">My Profile</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">85% Complete</p>
          </div>
          <Link to="/profile" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            Update Profile &rarr;
          </Link>
        </div>
        
        {/* Events Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">Upcoming Events</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">3</p>
          </div>
          <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            View Events &rarr;
          </Link>
        </div>

        {/* Directory Card */}
         <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">Alumni Directory</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">1,200+</p>
          </div>
          <Link to="/directory" className="text-indigo-600 hover:text-indigo-800 font-semibold mt-4 self-start">
            Find Alumni &rarr;
          </Link>
        </div>

        {/* Donations Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-500">My Donations</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-1">$0.00</p>
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

