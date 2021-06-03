// This endpoint is used to clear the `session` variables.
// This prevents users from directly entering their `user_id`
// without actually signing in.
export async function post(req, res) {
  // TODO: Figure out a way to fetch `/api/session`, so that
  //       we separate session handling logic from sign out
  //       logic. It should be fine to call this endpoint,
  //       but it's another thing to remember to change if
  //       ever our session logic changes.
  req.session.user_id = false;
  req.session.did_cards_load = false;
  req.session.lists = false;
  req.session.archived_cards = false;

  res.end();
}
