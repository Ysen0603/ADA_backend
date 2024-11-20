"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    totalSales: { type: Number, default: 0 }
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
