const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const fraudRoutes = require('./routes/fraud');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to MongoDB with retry logic
const connectDB = async () => {
  const maxRetries = 5;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      console.log('Connected to MongoDB');
      break;
    } catch (err) {
      retryCount++;
      console.error(`MongoDB connection attempt ${retryCount} failed:`, err);
      if (retryCount === maxRetries) {
        console.error('Failed to connect to MongoDB after maximum retries');
        process.exit(1);
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

connectDB();

// Handle MongoDB connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  connectDB();
});

// Health check endpoint
app.get('/api/auth/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fraud', fraudRoutes);

// Route not found handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
