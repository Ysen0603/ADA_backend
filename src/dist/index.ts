import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import analyticsRoutes from '../routes/analytics';
import productsRoutes from '../routes/products';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://yassineennaya2264:Q8jChRXcaBcuwtB@cluster0.kxill.mongodb.net/Project?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/analytics', analyticsRoutes);
app.use('/products', productsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
