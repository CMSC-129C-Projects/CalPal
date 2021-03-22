import { getCardsOfUser } from "./_database.js";

export async function get(req, res, next) {
  const { userId } = req.params;

  const cards = await getCardsOfUser(userId);

  if (cards !== null) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(cards));
  } else {
    console.error("Could not get cards");
    next();
  }
}
