import { getCardsOfUser } from "./_database.js";

export async function post(req, res) {
  req.session.user_id = req.body.user_id;
  req.session.lists = req.body.lists;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end();
}
