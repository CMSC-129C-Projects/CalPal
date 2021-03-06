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

  const introCardDescription =
    "Hello there, new user! Let's get you started with CalPal." +
    "\n\nThis is a card and its different card details which can be edited." +
    "\n\nCards can be archived, and archived cards can be found in the archived cards menu found in the sidebar." +
    "\n\nYou can add lists, cards, and folders into the board. List, cards, and folders can be rearranged by clicking and dragging them." +
    "\n\nYou can add and sync calendars which will automatically turn events into cards." +
    "\n\nFinally, you can switch between board view and calendar view to see when your cards are due." +
    "\n\nCheck out the folder below this card next!";

  const folderCardDescription =
    "Hello there! This is a card just like the one above!" +
    "\n\nTry adding cards in the folder. You can also drag the folder to another list and drag cards in and out of the folder!";

  const result = await cards.insertOne({
    user_id: userId,
    lists: [
      {
        _id: newObjectIdString(),
        list_name: "Not started",
        cards: [
          {
            _id: newObjectIdString(),
            card_name: "Welcome to CalPal! Click me to get started!",
            original_title: "",
            original_date: "",
            date_created: new Date(Date.now()),
            due_date_time: "",
            remind_date_time: "",
            description: introCardDescription,
            color: "#ffffff",
          },
          {
            _id: newObjectIdString(),
            folder_name: "I am a folder! Open me too!",
            cards: [
              {
                _id: newObjectIdString(),
                card_name: "Hello! I am card inside a folder!",
                original_title: "",
                original_date: "",
                date_created: new Date(Date.now()),
                due_date_time: "",
                remind_date_time: "",
                description: folderCardDescription,
                color: "#ffffff",
              },
            ],
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
    archived_cards: [
      {
        _id: newObjectIdString(),
        card_name: "I am an archived card!",
        original_title: "",
        original_date: "",
        date_created: new Date(Date.now()),
        due_date_time: "",
        remind_date_time: "",
        description:
          "This is a card just like the other two in the board. The difference is that this card is archived. You can no longer edit a card that is archived. If you want to unarchive a card, click the unarchive button on the bottom right. If you want to permanently delete a card, click the delete button next to the unarchive button.",
        color: "#ffffff",
      },
    ],
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
}

export async function getCalendarsOfUser(userId) {
  const db = await getDb();
  const result = await db.collection("calendars").findOne({ user_id: userId });

  return result.calendars;
}
