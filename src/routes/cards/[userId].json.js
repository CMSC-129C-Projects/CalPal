import { getCardsOfUser, createNewUser } from "./_database.js";

export async function get(req, res, next) {
  const { userId } = req.params;

  let cards = await getCardsOfUser(userId);

  if (cards === null) {
    await createNewUser(userId);
    cards = await getCardsOfUser(userId);
  }

  // We really can't get the user's cards.
  if (cards === null) {
    console.error("Really cannot get user's cards");
    next();
  }

  res.writeHead(200, "Content-Type", "application/json");
  res.end(JSON.stringify(cards));
}

export async function post(req, res) {
  req.session.user_id = req.body.user_id;
  req.session.lists = req.body.lists;
  req.session.archived_cards = req.body.archived_cards;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end();
}
