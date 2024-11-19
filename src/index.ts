import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import analyticsRoutes from './routes/analytics';
import productsRoutes from './routes/products';

const app = express();
const PORT = 3000;

// Middleware
// Utiliser cors pour autoriser les requêtes depuis votre frontend
const corsOptions = {
  origin: ['http://localhost:5173', 'https://projet-apa.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Certains navigateurs anciens ont des problèmes avec le statut 204
};

app.use(cors(corsOptions)); // Appliquer les options CORS
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
