export async function post(req, res) {
  for (const key in req.body) {
    req.session[key] = req.body[key];
  }

  console.dir(req.session);

  res.end();
}
