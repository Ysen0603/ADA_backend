"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    ProductID: { type: Number, required: true },
    ProductName: { type: String, required: true },
    Category: { type: String, required: true },
    Price: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Product', productSchema, 'products');
