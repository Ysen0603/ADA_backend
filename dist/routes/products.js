"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// GET /products
router.get('/', async (req, res) => {
    try {
        const period = req.query.period || '30d';
        let dateFilter = new Date();
        switch (period) {
            case '7d':
                dateFilter.setDate(dateFilter.getDate() - 7);
                break;
            case '30d':
                dateFilter.setDate(dateFilter.getDate() - 30);
                break;
            case '12m':
                dateFilter.setMonth(dateFilter.getMonth() - 12);
                break;
            default:
                dateFilter.setDate(dateFilter.getDate() - 30);
        }
        const products = await Product_1.default.aggregate([
            {
                $lookup: {
                    from: 'sales',
                    let: { productId: '$ProductID' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$ProductID', '$$productId'] },
                                        { $gte: ['$Date', dateFilter] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'sales'
                }
            },
            {
                $project: {
                    name: '$ProductName',
                    category: '$Category',
                    price: '$Price',
                    dateAdded: { $min: '$sales.Date' },
                    totalSales: { $sum: '$sales.Quantity' }
                }
            },
            {
                $sort: { totalSales: -1 }
            }
        ]);
        res.json({ products });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
