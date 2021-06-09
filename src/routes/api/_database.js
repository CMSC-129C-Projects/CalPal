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

  const userData = await cards.findOne({ user_id: userId });

  return userData;
}

export async function updateUserData(userId, lists, archived_cards, calendars) {
  const db = await getDb();
  const cards = db.collection("cards");

  const removeAllInstancesOfField = (object, fieldName) => {
    if (typeof object !== "object") {
      return object;
    }

    if (object[fieldName] != null) {
      delete object[fieldName];
    }

    for (let [field, value] of Object.entries(object)) {
      object[field] = removeAllInstancesOfField(value, fieldName);
    }

    return object;
  };

  const cleanLists = removeAllInstancesOfField([...lists], "isDndShadowItem");

  const filter = { user_id: userId };
  const updatedDocument = {
    $set: {
      lists: cleanLists,
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
export async function deleteAttachmentsInFolder(userId, folderId) {
  const userData = await getUserData(userId);
  let folder;

  for (const list of userData.lists) {
    for (const element of list.cards) {
      if (element._id === folderId) {
        folder = element;
      }
    }
  }

  for (const card of folder.cards) {
    deleteAttachmentsOfCard(card._id);
  }
}

export async function deleteAttachmentsInList(userId, listId) {
  const userData = await getUserData(userId);

  for (const list of userData.lists) {
    if (list._id === listId) {
      for (const element of list.cards) {
        if (element.card_name) {
          deleteAttachmentsOfCard(element._id);
        } else if (element.folder_name) {
          deleteAttachmentsInFolder(userId, element._id);
        }
      }
    }
  }

  return;
}

export async function getCalendarsOfUser(userId) {
  const db = await getDb();
  const result = await db.collection("calendars").findOne({ user_id: userId });

  return result.calendars;
}
