"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const analytics_1 = __importDefault(require("../routes/analytics"));
const products_1 = __importDefault(require("../routes/products"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins during development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect('mongodb+srv://yassineennaya2264:Q8jChRXcaBcuwtB@cluster0.kxill.mongodb.net/Project?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
// Routes
app.use('/analytics', analytics_1.default);
app.use('/products', products_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
