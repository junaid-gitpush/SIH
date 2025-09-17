import React, { useState } from 'react';

const AlumniCard = ({ alumni, viewMode }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            {!imageError && alumni.profilePicture ? (
              <img
                src={alumni.profilePicture}
                alt={alumni.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getRandomColor(alumni.name)}`}>
                {getInitials(alumni.name)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {alumni.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {alumni.jobTitle} at {alumni.company}
                </p>
                <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                  <span>{alumni.department} • {alumni.graduationYear}</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {alumni.location}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 ml-4">
                <a
                  href={`mailto:${alumni.email}`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact
                </a>
                <a
                  href={`https://${alumni.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {alumni.bio}
            </p>

            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {alumni.skills && alumni.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
              {alumni.skills && alumni.skills.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{alumni.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        {!imageError && alumni.profilePicture ? (
          <img
            src={alumni.profilePicture}
            alt={alumni.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200"
            onError={handleImageError}
          />
        ) : (
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold text-xl ring-2 ring-gray-200 ${getRandomColor(alumni.name)}`}>
            {getInitials(alumni.name)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {alumni.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {alumni.jobTitle}
        </p>
        <p className="text-sm font-medium text-blue-600 mb-3">
          {alumni.company}
        </p>
        
        {/* Info Row */}
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-500 mb-3">
          <span>{alumni.department}</span>
          <span>•</span>
          <span>{alumni.graduationYear}</span>
        </div>
        
        <div className="flex justify-center items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {alumni.location}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {alumni.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-1 mb-6">
          {alumni.skills && alumni.skills.slice(0, 2).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
          {alumni.skills && alumni.skills.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{alumni.skills.length - 2}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <a
            href={`mailto:${alumni.email}`}
            className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact
          </a>
          <a
            href={`https://${alumni.linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;