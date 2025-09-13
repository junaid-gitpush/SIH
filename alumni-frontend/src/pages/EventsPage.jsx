import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // We'll use this to get the user ID from the token
import { useAuth } from '../context/AuthContext';

const EventsPage = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({}); // To hold messages for specific events

  // Get the current user's ID from the JWT token
  const getUserId = () => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user.id;
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  };

  const userId = getUserId();

  // Fetch events when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        // Sort events by date, showing the nearest upcoming first
        const sortedEvents = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (err) {
        setError('Could not fetch events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    if (!token) {
      // This should ideally not happen due to ProtectedRoute, but it's good practice
      setMessage({ id: eventId, text: 'You must be logged in to RSVP.', type: 'error' });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`, {}, config);

      // Update the event in the state to reflect the new RSVP
      setEvents(events.map(event =>
        event._id === eventId ? { ...event, attendees: res.data } : event
      ));

      setMessage({ id: eventId, text: 'RSVP successful!', type: 'success' });
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An error occurred. Please try again.';
      setMessage({ id: eventId, text: errorMessage, type: 'error' });
      console.error(err);
    }
     // Clear the message after 3 seconds
    setTimeout(() => setMessage({}), 3000);
  };

  if (loading) {
    return <div className="p-8"><h1 className="text-2xl font-bold">Loading Events...</h1></div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
      
      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
             <h3 className="text-xl font-semibold text-gray-700">No Upcoming Events</h3>
             <p className="text-gray-500 mt-2">Please check back later for new events!</p>
          </div>
        ) : (
          events.map((event) => {
            const hasRSVPd = event.attendees.includes(userId);
            return (
              <div key={event._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{event.title}</h3>
                      <p className="text-gray-500 mt-1 flex items-center">
                        <i className="fas fa-map-marker-alt w-4 h-4 mr-2"></i>
                        {event.location}
                      </p>
                    </div>
                    <div className="text-right">
                       <button
                        onClick={() => handleRSVP(event._id)}
                        disabled={hasRSVPd}
                        className={`font-bold py-2 px-5 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          hasRSVPd
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                        }`}
                      >
                        {hasRSVPd ? '✓ RSVP\'d' : 'RSVP Now'}
                      </button>
                       <p className="text-sm text-gray-500 mt-2">{event.attendees.length} going</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-4">{event.description}</p>
                   {message.id === event._id && (
                    <p className={`mt-3 text-sm font-semibold ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventsPage;