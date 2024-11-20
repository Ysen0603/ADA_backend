import { Schema, model, Document, Types } from 'mongoose';
import { IProduct } from './Product';

export interface ISale extends Document {
  product: Types.ObjectId | IProduct;
  quantity: number;
  totalPrice: number;
  date: Date;
}

const saleSchema = new Schema<ISale>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default model<ISale>('Sale', saleSchema);
