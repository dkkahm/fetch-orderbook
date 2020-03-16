const mongoose = require("mongoose");
console.log(Object.keys(mongoose));

async function main() {
  const db = await mongoose.connect("mongodb://localhost/fetch-orderbook");
  console.log(db);
}

main();
