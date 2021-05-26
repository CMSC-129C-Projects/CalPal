import { getCalendarsOfUser } from "../../../cards/_database";

export async function get(req, res, next) {
  const { userId } = req.params;

  let result = await getCalendarsOfUser(userId);

  if (!result) {
    result = [];
  }

  res.writeHead(200, "Content-Type", "application/json");
  res.end(JSON.stringify(result));
}
