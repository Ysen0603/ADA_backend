"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sale_1 = __importDefault(require("../models/Sale"));
const router = express_1.default.Router();
// GET /analytics/total_sales
router.get('/total_sales', async (req, res) => {
    try {
        const { period } = req.query;
        let dateFilter = {};
        if (period) {
            const now = new Date();
            switch (period) {
                case '7d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
                    break;
                case '30d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 30)) } };
                    break;
                case '12m':
                    dateFilter = { Date: { $gte: new Date(now.setMonth(now.getMonth() - 12)) } };
                    break;
            }
        }
        const sales = await Sale_1.default.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$TotalAmount' }
                }
            }
        ]);
        res.json({ totalSales: sales.length > 0 ? sales[0].totalSales : 0 });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /analytics/trending_products
router.get('/trending_products', async (req, res) => {
    try {
        const { period } = req.query;
        let dateFilter = {};
        if (period) {
            const now = new Date();
            switch (period) {
                case '7d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
                    break;
                case '30d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 30)) } };
                    break;
                case '12m':
                    dateFilter = { Date: { $gte: new Date(now.setMonth(now.getMonth() - 12)) } };
                    break;
            }
        }
        const trendingProducts = await Sale_1.default.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: '$ProductID',
                    quantitySold: { $sum: '$Quantity' },
                    totalSales: { $sum: '$TotalAmount' }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'ProductID',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $project: {
                    _id: 1,
                    name: '$product.ProductName',
                    quantitySold: 1,
                    totalSales: 1
                }
            },
            { $sort: { quantitySold: -1 } },
            { $limit: 3 }
        ]);
        res.json(trendingProducts);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /analytics/category_sales
router.get('/category_sales', async (req, res) => {
    try {
        const { period } = req.query;
        let dateFilter = {};
        if (period) {
            const now = new Date();
            switch (period) {
                case '7d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
                    break;
                case '30d':
                    dateFilter = { Date: { $gte: new Date(now.setDate(now.getDate() - 30)) } };
                    break;
                case '12m':
                    dateFilter = { Date: { $gte: new Date(now.setMonth(now.getMonth() - 12)) } };
                    break;
            }
        }
        const sales = await Sale_1.default.aggregate([
            { $match: dateFilter },
            {
                $lookup: {
                    from: 'products',
                    localField: 'ProductID',
                    foreignField: 'ProductID',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: '$product.Category',
                    sales: { $sum: '$TotalAmount' }
                }
            }
        ]);
        const totalSales = sales.reduce((acc, cat) => acc + cat.sales, 0);
        const categorySalesWithPercentage = sales.map(category => ({
            category: category._id,
            sales: category.sales,
            percentage: ((category.sales / totalSales) * 100).toFixed(2)
        }));
        res.json(categorySalesWithPercentage);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
