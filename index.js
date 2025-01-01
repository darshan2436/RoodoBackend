// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth'); // Import auth routes
const todoRouter = require('./routes/todo'); // Import todo routes
const routineRouter = require('./routes/routine'); // Import routine routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter); // User authentication routes (signup, login)
app.use('/api/todo', todoRouter); // Todo-related routes
app.use('/api/routine', routineRouter); // Routine-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
