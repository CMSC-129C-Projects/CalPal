import { updateUserData } from "./_database.js";

export async function post(req, res) {
  const { userId } = req.params;

  req.session.lists = req.body.lists ?? [];
  req.session.archived_cards = req.body.archived_cards ?? [];
  req.session.calendars = req.body.calendars ?? [];

  const lists = req.session.lists;
  const archivedCards = req.session.archived_cards;
  const calendars = req.session.calendars;

  await updateUserData(userId, lists, archivedCards, calendars);

  res.end();
}
