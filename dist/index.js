"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
// MongoDB connection options
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
};
// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://yassineennaya2264:Q8jChRXcaBcuwtB@cluster0.kxill.mongodb.net/Project', mongooseOptions);
        console.log('Connected to MongoDB Atlas');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};
// Initial connection attempt
connectWithRetry();
// Handle MongoDB connection errors
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    setTimeout(connectWithRetry, 5000);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    setTimeout(connectWithRetry, 5000);
});
// Routes
app.use('/analytics', analytics_1.default);
app.use('/products', products_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
