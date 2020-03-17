import axios from "axios";
import * as mongodb from "mongodb";
// import * as mongoose from "mongoose";
import { OrderBook, OrderBookModel } from "./models/OrderBook";
const mongoose = require("mongoose");

enum Currency {
  XRP = "XRP",
  BTC = "BTC"
}

const db_url = "mongodb://localhost/fetch-orderbook";
const fetch_orderbook_url_base = "https://api.bithumb.com/public/orderbook/";
const INTERVAL_MS = 5000;
const target_currcy_list = [Currency.XRP, Currency.BTC];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function fetchOrderbook(currency: Currency) {
  const result = await axios.get(fetch_orderbook_url_base + currency);
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

    target_currcy_list.forEach(async currency => {
      const data = await fetchOrderbook(currency);
      if (data.status === "0000") {
        await saveOrderbook(data.data);
      }
    });
  }
}

main();
