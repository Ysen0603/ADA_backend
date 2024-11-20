import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  dateAdded: Date;
  totalSales?: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  totalSales: { type: Number, default: 0 }
});

export default model<IProduct>('Product', productSchema);
