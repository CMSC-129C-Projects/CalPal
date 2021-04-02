const MongoClient = require("mongodb").MongoClient;

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

    const userCards = await cards.findOne({ user_id: userId });

    return userCards;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function updateCardsOfUser(userId, lists) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const database = client.db("calpal");
    const cards = database.collection("cards");

    const filter = { user_id: userId };
    const updatedDocument = {
      $set: {
        lists: lists,
      },
    };

    const result = await cards.updateOne(filter, updatedDocument);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
