import { getUserData, createNewUser } from "../_database.js";

export async function get(req, res, next) {
  const { userId } = req.params;

  let cards = await getUserData(userId);

  if (cards === null) {
    await createNewUser(userId);
    cards = await getUserData(userId);
  }

  // We really can't get the user's cards.
  if (cards === null) {
    console.error("Really cannot get user's cards");
    next();
  }

  res.writeHead(200, "Content-Type", "application/json");
  res.end(JSON.stringify(cards));
}
