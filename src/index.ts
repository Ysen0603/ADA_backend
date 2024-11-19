import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import analyticsRoutes from './routes/analytics';
import productsRoutes from './routes/products';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yassineennaya2264:Q8jChRXcaBcuwtB@cluster0.kxill.mongodb.net/Project';

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// MongoDB connection options
const mongooseOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 30000, // Increased timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
};

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Initial connection attempt
connectWithRetry();

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectWithRetry, 5000);
});

// Routes
app.use('/analytics', analyticsRoutes);
app.use('/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
