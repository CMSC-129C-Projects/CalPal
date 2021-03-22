import { getCardsOfUser } from "./_database.js";

export async function get(req, res, next) {
  const { userId } = req.params;

  console.debug(`user = ${userId}`);
  const cards = await getCardsOfUser(userId);
  console.debug("*** cards START ***");
  console.debug(cards);
  console.debug("*** cards END ***");

  if (cards !== null) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(cards));
  } else {
    console.error("Could not get cards");
    // next();
  }
}
