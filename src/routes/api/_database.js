const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const uri = "mongodb://127.0.0.1:27017";

let cachedDb;

async function getDb() {
  if (!cachedDb) {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db("calpal");
    cachedDb = db;
  }

  return cachedDb;
}

export async function getUserData(userId) {
  const db = await getDb();
  const cards = db.collection("cards");

  const userCards = await cards.findOne({ user_id: userId });

  return userCards;
}

export async function updateUserData(userId, lists, archived_cards, calendars) {
  const db = await getDb();
  const cards = db.collection("cards");

  const filter = { user_id: userId };
  const updatedDocument = {
    $set: {
      lists: lists,
      archived_cards: archived_cards,
      calendars: calendars,
    },
  };

  const result = await cards.updateOne(filter, updatedDocument);
  return result;
}

export async function createNewUser(userId) {
  const db = await getDb();
  const cards = db.collection("cards");

  const result = await cards.insertOne({
    user_id: userId,
    lists: [
      {
        _id: newObjectIdString(),
        list_name: "Not started",
        cards: [
          // TODO: Put a description to introduce CalPal.
          {
            _id: newObjectIdString(),
            card_name: "Welcome to CalPal!",
            original_title: "",
            original_date: "",
            date_created: new Date(Date.now()),
            due_date_time: "",
            remind_date_time: "",
            description: "Hello world.",
            color: "#ffffff",
          },
        ],
      },
      {
        _id: newObjectIdString(),
        list_name: "Doing",
        cards: [],
      },
      {
        _id: newObjectIdString(),
        list_name: "Done",
        cards: [],
      },
    ],
    archived_cards: [],
    calendars: [],
  });

  return result;
}

export function newObjectIdString() {
  return new ObjectID().toHexString();
}

export async function getAttachmentsOfCard(cardId) {
  const db = await getDb();
  const attachmentsCollection = db.collection("attachments");

  const attachments = await attachmentsCollection
    .find({ card_id: cardId })
    .toArray();

  return attachments;
}

// TODO: Handle multiple attachments
export async function insertAttachment(newAttachment) {
  const db = await getDb();
  const attachmentsCollection = db.collection("attachments");

  const result = await attachmentsCollection.insertOne(newAttachment);

  return result;
}

export async function deleteAttachment(attachmentId) {
  const db = await getDb();
  const result = await db
    .collection("attachments")
    .deleteOne({ _id: attachmentId });

  return result;
}

export async function deleteAttachmentsOfCard(cardId) {
  const db = await getDb();
  const result = await db
    .collection("attachments")
    .deleteMany({ card_id: cardId });

  return result;
}

//TODO: Find a way to make Mongo do the parsing and deleting work
export async function deleteAttachmentsinFolder(userId, folderId) {
  const userCards = await getUserData(userId);
  let folder;

  for (const list of userCards.lists) {
    for (const element of list.cards) {
      if (element._id === folderId) {
        folder = element;
      }
    }
  }

  for (const card of folder.cards) {
    deleteAttachmentsOfCard(card._id);
  }

  return;
}

export async function getCalendarsOfUser(userId) {
  const db = await getDb();
  const result = await db.collection("calendars").findOne({ user_id: userId });

  return result.calendars;
}
