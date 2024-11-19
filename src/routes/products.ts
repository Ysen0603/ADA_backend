import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  try {
    const period = req.query.period || '30d';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    let dateFilter = new Date();
    
    switch(period) {
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

    // Compter le nombre total de produits
    const totalProducts = await Product.countDocuments();

    // Récupérer les produits avec pagination
    const products = await Product.aggregate([
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
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ]);

    res.json({
      products,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit)
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
