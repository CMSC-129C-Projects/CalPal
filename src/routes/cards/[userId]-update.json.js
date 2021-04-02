import { updateCardsOfUser } from "./_database.js";

export async function post(req, res) {
  const { userId } = req.params;
  const lists = req.body.lists;
  console.debug(`[[userId]-update.json.js] userId, lists: ${userId}, ${lists}`);

  await updateCardsOfUser(userId, lists);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end();
}
