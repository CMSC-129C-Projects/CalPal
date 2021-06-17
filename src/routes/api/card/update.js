import { updateUserData } from "../_database.js";

export async function post(req, res) {
  const userId = req.query.user;

  // TODO: Find a way to fetch from `/api/session` so that there's
  //       no need to manually set the session here ourselves.
  //       This makes things easier to maintain since the session
  //       handling logic is separate from updating card data.
  req.session.lists = req.body.lists ?? [];
  req.session.archived_cards = req.body.archived_cards ?? [];
  req.session.calendars = req.body.calendars ?? [];

  const lists = req.session.lists;
  const archivedCards = req.session.archived_cards;
  const calendars = req.session.calendars;

  await updateUserData(userId, lists, archivedCards, calendars);

  res.end();
}
