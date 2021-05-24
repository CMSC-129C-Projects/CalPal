// This endpoint is used to clear the `session` variables.
// This prevents users from directly entering their `user_id`
// without actually signing in.
export async function post(req, res) {
  req.session.did_cards_load = false;
  req.session.user_id = "";
  req.session.lists = [];
  req.session.archived_cards = [];

  res.end();
}