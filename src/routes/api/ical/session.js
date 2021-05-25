export async function post(req, res) {
  req.session.calendars = req.body.calendars;

  res.end();
}