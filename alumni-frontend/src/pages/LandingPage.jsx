import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Alumni Portal</h1>
        <div>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold mr-4">
            Sign In
          </Link>
          <Link to="/signup" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Reconnect. Engage. Grow.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your centralized platform for managing alumni data, fostering engagement, and building a stronger community.
          </p>
          <div className="mt-8">
            <Link to="/signup" className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
              Join the Network
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Portal Features</h3>
          <div className="flex flex-wrap -mx-4">
            {/* Feature 1 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-gray-50 h-full">
                <h4 className="text-2xl font-bold text-indigo-600 mb-3">Centralized Data</h4>
                <p className="text-gray-600">
                  A single, reliable system to manage alumni data, from contact information to career updates.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-gray-50 h-full">
                <h4 className="text-2xl font-bold text-indigo-600 mb-3">Engagement Tools</h4>
                <p className="text-gray-600">
                  Manage events, facilitate mentorship, and share opportunities to keep your alumni connected.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="rounded-lg shadow-lg p-8 bg-gray-50 h-full">
                <h4 className="text-2xl font-bold text-indigo-600 mb-3">Fundraising Potential</h4>
                <p className="text-gray-600">
                  Enhance fundraising outreach and track donations through a secure, integrated system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
