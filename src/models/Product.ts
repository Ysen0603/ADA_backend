import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema, 'products');
