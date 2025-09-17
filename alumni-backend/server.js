const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware to parse JSON
const allowedOrigins = [
  'http://localhost:5173', // Your local frontend for development
  'https://sih-alumni-iota.vercel.app' // Your deployed Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

// --- Import API Routes ---
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const eventRoutes = require("./routes/eventRoutes");
const donationRoutes = require("./routes/donationRoutes");

// --- Use API Routes ---
app.use("/api/auth", authRoutes);       // For login and signup
app.use("/api/profile", profileRoutes); // For all profile-related actions
app.use("/api/events", eventRoutes);    // For all event-related actions
app.use("/api/donations", donationRoutes); //For donating PAISAAA

// --- Starting the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

