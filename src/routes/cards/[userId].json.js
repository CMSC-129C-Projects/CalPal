import { getCardsOfUser } from "./_database.js";

export async function get(req, res, next) {
  const { userId } = req.params;

  const cards = await getCardsOfUser(userId);

  if (cards !== null) {
    res.writeHead(200, "Content-Type", "application/json");
    res.end(JSON.stringify(cards));
  } else {
    console.error("Could not get cards");
    next();
  }
}

export async function post(req, res) {
  req.session.user_id = req.body.user_id;
  req.session.lists = req.body.lists;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end();
}
