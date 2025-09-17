import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import AlumniCard from '../components/AlumniCard';
import alumniAPI from '../services/alumniAPI'; // Make sure to create this API service file

const DirectoryPage = () => {
  // --- State Management ---
  const [alumniData, setAlumniData] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    department: '',
    location: '',
    companyType: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(false);

  // --- Data Fetching ---
  // This effect runs once on component mount to fetch all alumni data.
  useEffect(() => {
    const fetchAlumni = async () => {
      setIsLoading(true);
      try {
        // Fetches all alumni from your backend API
        const data = await alumniAPI.getAllAlumni();
        setAlumniData(data); // Store the original full list
        setFilteredAlumni(data); // Set the initial list to be displayed
      } catch (error) {
        console.error('Error fetching alumni:', error);
        // You could add a state here to show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumni();
  }, []); // Empty dependency array ensures this runs only once

  // --- Search and Filter Logic ---
  // This effect re-runs whenever the search term, filters, or the base alumni data change.
  useEffect(() => {
    let filtered = [...alumniData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(alumni =>
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumni.company && alumni.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.location && alumni.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (alumni.jobTitle && alumni.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Advanced filters
    if (filters.graduationYear) {
      filtered = filtered.filter(alumni =>
        alumni.graduationYear.toString() === filters.graduationYear
      );
    }
    if (filters.department) {
      filtered = filtered.filter(alumni => alumni.department === filters.department);
    }
    if (filters.location) {
      filtered = filtered.filter(alumni => alumni.location === filters.location);
    }
    if (filters.companyType) {
        filtered = filtered.filter(alumni => {
            if (!alumni.company) return false;
            const companyLower = alumni.company.toLowerCase();
            switch (filters.companyType) {
                case 'Tech':
                    return ['google', 'microsoft', 'amazon', 'adobe', 'flipkart', 'swiggy', 'paytm', 'zomato'].some(tech => companyLower.includes(tech));
                case 'Finance':
                    return ['deloitte', 'goldman', 'jpmorgan', 'citi'].some(finance => companyLower.includes(finance));
                case 'Healthcare':
                    return ['apollo', 'fortis', 'max', 'manipal'].some(health => companyLower.includes(health));
                case 'Education':
                    return ['byju', 'unacademy', 'vedantu'].some(edu => companyLower.includes(edu));
                default:
                    return true;
            }
        });
    }

    setFilteredAlumni(filtered);
  }, [searchTerm, filters, alumniData]);

  // --- Event Handlers ---
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      graduationYear: '',
      department: '',
      location: '',
      companyType: ''
    });
  };

  // --- Render Method ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>
              <p className="mt-1 text-sm text-gray-600">
                Connect with our global community of graduates.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredAlumni.length}</span> of <span className="font-medium">{alumniData.length}</span> alumni
          </p>
        </div>

        {/* Alumni Display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Loading Alumni...</p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">No Alumni Found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} viewMode={viewMode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DirectoryPage;