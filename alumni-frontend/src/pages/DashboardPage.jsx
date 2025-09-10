const DashboardPage = () => {
  // We will add logic here later to fetch user data
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">Alumni Portal</h1>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h2>
            <p className="mt-4 text-gray-600">
              This is your personal space. We will soon add features here to view your profile, see upcoming events, and connect with other alumni.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
