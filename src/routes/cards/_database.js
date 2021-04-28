const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

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

export async function updateCardsOfUser(userId, lists, archived_cards) {
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
        archived_cards: archived_cards,
      },
    };

    const result = await cards.updateOne(filter, updatedDocument);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export function newObjectIdString() {
  return new ObjectID().toHexString();
}

export async function getAttachmentsOfCard(cardId) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const database = client.db("calpal");
    const attachmentsCollection = database.collection("attachments");

    const attachments = await attachmentsCollection
      .find({ card_id: cardId })
      .toArray();

    return attachments;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// TODO: Handle multiple attachments
export async function insertAttachmentToCard(cardId, newAttachment) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const attachmentsCollection = client.db("calpal").collection("attachments");
    const newDocument = {
      card_id: cardId,
      data: newAttachment,
    };

    const result = await attachmentsCollection.insertOne(newDocument);

    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
