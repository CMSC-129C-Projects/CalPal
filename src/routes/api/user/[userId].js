export async function post(req, res) {
  req.session.user_id = req.params.user_id;
  res.end();
}
