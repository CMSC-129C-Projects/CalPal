import { getCardsOfUser } from "./_database.js";

export async function get(req, res, next) {
  const { user } = req.params;

  console.debug(`user = ${user}`);
  const cards = await getCardsOfUser(user);
  console.debug("*** cards START ***");
  console.debug(cards);
  console.debug("*** cards END ***");

  if (cards !== null) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(cards));
  } else {
    console.error("Could not get cards");
    next();
  }
}
