import axios from "axios";
import * as mongodb from "mongodb";
// import * as mongoose from "mongoose";
import { OrderBook, OrderBookModel } from "./models/OrderBook";
const mongoose = require("mongoose");

const db_url = "mongodb://localhost/fetch-orderbook";
const fetch_orderbook_url = "https://api.bithumb.com/public/orderbook/XRP";
const INTERVAL_MS = 5000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function fetchOrderbook() {
  const result = await axios.get(fetch_orderbook_url);
  // console.log(result.data);
  return result.data;
}

async function saveOrderbook(data: OrderBook) {
  let orderBook = new OrderBookModel(data);
  // console.log(orderBook);
  return await orderBook.save();
}

async function main() {
  // const db = await mongodb.MongoClient.connect(db_url);
  const db = await mongoose.connect(db_url, { useNewUrlParser: true });
  // console.log(db);

  while (true) {
    await sleep(INTERVAL_MS);

    const data = await fetchOrderbook();
    if (data.status === "0000") {
      await saveOrderbook(data.data);
    }
  }
}

main();
