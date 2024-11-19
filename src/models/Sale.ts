import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  SaleID: { type: Number, required: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true }
});

export default mongoose.model('Sale', saleSchema, 'sales');
