import { updateCardsOfUser } from "./_database.js";

export async function post(req, res) {
  const { userId } = req.params;
  const lists = req.body.lists;
  const archivedCards = req.body.archived_cards;

  const result = await updateCardsOfUser(userId, lists, archivedCards);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(result));
}
