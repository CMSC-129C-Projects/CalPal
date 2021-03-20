const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  newUrlParser: true,
  useUnifiedTopology: true,
});

async function getCardsOfUser(user_id) {
  try {
    await client.connect();

    const database = client.db("calpal");
    const cards = database.collection("cards");

    const userCards = await cards.find({ user_id: user_id });

    return userCards;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function get(req, res, next) {
  let userCards = await getCardsOfUser(req.params);
}

console.debug(getCardsOfUser(1));
