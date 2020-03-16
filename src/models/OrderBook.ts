import * as mongoose from "mongoose";

export interface OrderBook extends mongoose.Document {
  timestmap: string;
  order_currency: string;
  bids: { price: string; quantity: string }[];
  asks: { price: string; quantity: string }[];
}

const schema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  order_currency: { type: String, required: true },
  bids: [{ price: String, quantity: String }],
  asks: [{ price: String, quantity: String }]
});
export const OrderBookModel = mongoose.model<OrderBook>("OrderBook", schema);
