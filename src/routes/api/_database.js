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
            card_name: "Welcome to CalPal! Click me to get started!",
            original_title: "",
            original_date: "",
            date_created: new Date(Date.now()),
            due_date_time: "",
            remind_date_time: "",
            description:
              "Hello there, new user! Let's get you started with CalPal. \n What you are looking at right now is a card nad its different card details. You can edit the different card details by clicking on their respective input fields and inputting your desired card detail. \n If you want to archive this card, you can click the archive card button on the bottom right of this card. If you want to access and archived card, click on the Menu button represented by the 3 vertical dots on page's header found on the top right corner. \n You can add lists, cards, and folders with their respective buttons. Lists can be dragged and dropped around the board. Cards can be dragged and dropped into lists and folders. Folders can be dragged and dropped into lists. You can add and sync calendars using the Add Calendar Button found on the page's header. You can switch between board and calendar view using the Switch View Button found on the page's header. \n That's all you need to know to get started. Enjoy and be productive!",
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

export async function getCalendarsOfUser(userId) {
  const db = await getDb();
  const result = await db.collection("calendars").findOne({ user_id: userId });

  return result.calendars;
}
