export async function post(req, res) {
  for (const key in req.body) {
    req.session[key] = req.body[key];
  }

  res.end();
}
