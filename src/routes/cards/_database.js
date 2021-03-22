const MongoClient = require("mongodb").MongoClient;
// import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getCardsOfUser(user_id) {
  try {
    await client.connect();

    const database = client.db("calpal");
    const cards = database.collection("cards");

    // let userCards = await cards.findOne({ user_id: user_id });
    let userCards = await cards.find().toArray();
    console.debug("*** userCards START ***");
    console.debug(userCards);
    console.debug("*** userCards END ***");

    return userCards;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// console.debug(getCardsOfUser(1));
