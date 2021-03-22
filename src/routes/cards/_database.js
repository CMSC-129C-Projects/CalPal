const MongoClient = require("mongodb").MongoClient;
// import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";

export async function getCardsOfUser(userId) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const database = client.db("calpal");
    const cards = database.collection("cards");

    // TODO: Figure out why `userId` acts as `null` when passed to
    //       cards.findOne(). For the sake of leaving the code in
    //       a working state, we simply get all the documents in
    //       the `cards` collection.
    const userCards = await cards.find().toArray();
    // const userCards = await cards.findOne({ user_id: userId });

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
