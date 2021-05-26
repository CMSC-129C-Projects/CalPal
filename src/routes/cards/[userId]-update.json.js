import { updateCardsOfUser } from "./_database.js";

export async function post(req, res) {
  const { userId } = req.params;
  
  req.session.lists = req.body.lists;
  req.session.archived_cards = req.body.archived;

  const lists = req.session.lists;
  const archivedCards = req.session.archived_cards;

  const result = await updateCardsOfUser(userId, lists, archivedCards);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(result));
}
