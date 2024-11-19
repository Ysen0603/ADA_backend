"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    SaleID: { type: Number, required: true },
    ProductID: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Date: { type: Date, required: true },
    TotalAmount: { type: Number, required: true }
});
exports.default = mongoose_1.default.model('Sale', saleSchema, 'sales');
