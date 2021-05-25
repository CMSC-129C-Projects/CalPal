import { getCalendarsOfUser } from "../../../cards/_database";

export async function get(req, res, next) {
  const { userId } = req.params;

  const result = await getCalendarsOfUser(userId);

  if (!result) {
    console.error("Could not get calendars of user");
    next();
  }

  res.writeHead(200, "Content-Type", "application/json");
  res.end(JSON.stringify(result));
}
