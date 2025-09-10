Alumni Portal Backend API

This document provides a complete guide to the API endpoints for the Alumni Management Platform.
Base URL

All endpoints are relative to the base URL: http://localhost:3000

1. Authentication

Handles user registration and login.
POST /api/auth/signup

    Description: Registers a new user.

    Access: Public

    Body:

    {
      "name": "Your Name",
      "email": "user@example.com",
      "password": "yourpassword"
    }

POST /api/auth/login

    Description: Logs in an existing user and returns a JWT token.

    Access: Public

    Body:

    {
      "email": "user@example.com",
      "password": "yourpassword"
    }

2. Profiles

Handles alumni profile data. All routes require an Authorization: Bearer <token> header.
POST /api/profile

    Description: Creates or updates the profile for the logged-in user.

    Access: Private

    Body:

    {
      "major": "Computer Science",
      "graduationYear": 2024,
      "company": "Tech Corp",
      "jobTitle": "Developer",
      "location": "City, Country",
      "bio": "A short bio about yourself.",
      "linkedin": "[https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)"
    }

GET /api/profile/me

    Description: Fetches the profile of the logged-in user.

    Access: Private

3. Events

Handles event creation and participation.
GET /api/events

    Description: Gets a list of all events.

    Access: Public

POST /api/events

    Description: Creates a new event.

    Access: Private (Requires Authorization header)

    Body:

    {
      "title": "Annual Alumni Meetup",
      "description": "Networking event for all alumni.",
      "date": "2025-12-15T18:30:00Z",
      "location": "Main Auditorium"
    }

POST /api/events/:id/rsvp

    Description: Allows the logged-in user to RSVP for an event.

    Access: Private (Requires Authorization header)

    Parameters: id - The ID of the event.

4. Donations

Handles recording of donations.
POST /api/donations

    Description: Records a donation made by the logged-in user.

    Access: Private (Requires Authorization header)

    Body:

    {
      "amount": 100,
      "campaign": "Library Fund 2025"
    }

GET /api/donations

    Description: Gets a list of all donations (for admin view).

    Access: Private (Requires Authorization header)